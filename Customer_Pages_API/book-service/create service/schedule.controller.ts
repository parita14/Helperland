import { NextFunction, Request, Response } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { ScheduleService } from "./schedule.service";
import jwt from "jsonwebtoken";

import mailgun from "mailgun-js";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

export class ScheduleController {
  public constructor(private readonly scheduleService: ScheduleService) {
    this.scheduleService = scheduleService;
  }

  public decodeToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const token = req.headers.authorization;
    if(token) {
      jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
        if(error) {
          return res.status(400).json("Invalid Login!");
        }
        else {
          req.body.ZipCode = user.ZipCode;
          req.body.Email = user.Email;
          return this.scheduleService
            .findByEmail(user.Email)
            .then((user) => {
              if(user?.UserTypeId === 1) {
                next();
              }
              else {
                return res.status(400).json("You are not customer, try to login using customer account!");
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({ error: error });
            });
        }
      });
    }
    else {
      return res.status(400).json("Token not exists!");
    }
  };

  public createService = async (req: Request, res: Response): Promise<Response | void> => {
    const token = req.headers.authorization;
    req.body.Status = 1;
    req.body.ServiceHourlyRate = 25;
    req.body.ExtraHours = req.body.ExtraService.length * 0.5;
    req.body.SubTotal = req.body.ServiceHourlyRate * req.body.ServiceHours
    req.body.TotalCost = req.body.ExtraService.length * 12.5 + req.body.SubTotal;
    req.body.ServiceRequestAddress.Email = req.body.Email;
    req.body.ServiceRequestAddress.PostalCode = req.body.ZipCode;

      return this.scheduleService
        .findByEmail(req.body.Email)
        .then(async (user) => {
          if(user) {
            if(user.UserTypeId === 1) {
              req.body.UserId = user.UserId;
              req.body.ModifiedBy = user.UserId;
            }
            else {
              return res.status(404).json("You are not a Customer!");
            }
          }
          else {
            return res.status(404).json("No user exists with this email!");
          }
          req.body.ServiceId = await Math.floor(1000 + Math.random() * 9000);
          return this.scheduleService
            .scheduleService(req.body)
            .then(async (service) => {
              if(service) {
                if(service.ServiceProviderId) {
                  return this.scheduleService
                  .findSpById(service.ServiceProviderId)
                  .then(async (helper) => {
                    if(helper) {
                      const email = await this.scheduleService.serviceForSP(helper.Email!, service.ServiceId!);
                      await mg.messages().send(email);
                    }
                    else {
                      return res.status(404).json("Service Provider not found!");
                    }
                    return res.status(200).json({ message: "Booking has been successfully submitted!", ServiceId: service.ServiceId });
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error });
                  });
                }
                else {
                  return this.scheduleService
                  .getSP(service.ZipCode)
                  .then(async (sp) => {
                    if(sp.length > 0) {
                      for(let s in sp) {
                        const serviceRequest = await this.scheduleService.serviceRequest(sp[s].Email, service.ServiceId!);
                        await mg.messages().send(serviceRequest);
                      }
                      return res.status(200).json({ message: "Booking has been successfully submitted!", ServiceId: service.ServiceId });
                    }
                    else {
                      return res.status(404).json("No service provider found!");
                    }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error });
                  });
                }
              }
              else {
                return res.status(500).json("Error");
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({ error: error });
            });
        })
        .catch((error: Error) => {
          return res.status(500).json({ error: error });
        });
  };

  public getServiceAddresses = async(req: Request, res: Response): Promise<Response | void> => {
    let serviceAddress: ServiceRequestAddress[] = [];
    if(req.headers.authorization) {
      jwt.verify(req.headers.authorization, process.env.SECRET_KEY!, (error, user: any) => {
        if(error) {
          return res.status(400).json("Invalid Login!");
        }
        else {
          return this.scheduleService
            .findAddressEmail(user.Email)
            .then((address) => {
              if(!address) {
                return res.status(404).json("There is no address found with this email!");
              }
              else {
                return this.scheduleService
                  .getServiceAddresses(address.Email)
                  .then((Address) => {
                    if(Address.length > 0) {
                      for(let a in Address) {
                        serviceAddress.push(Address[a]);
                      }
                      if(serviceAddress.length > 0) {
                        return res.status(200).json({ serviceAddress });
                      }
                      else {
                        return res.status(404).json("There is no address found!");
                      }
                    }
                    else {
                      return res.status(404).json("Service Request Address not found!");
                    }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error: error }); 
                   });
              }
            })
            .catch((error: Error) => {
             return res.status(500).json({ error: error }); 
            });
        }
      });
    }
    else {
      return res.status(400).json("No token exists!");
    }
  };

  public createFAndB = async(req: Request, res: Response): Promise<Response | undefined> => {
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.SECRET_KEY!, (error, user: any) => {
            if(error) {
                return res.status(400).json("Invalid login!");
            }
            else {
                return this.scheduleService
                  .findByEmail(user.Email)
                  .then((userbyEmail) => {
                    if(userbyEmail) {
                      return this.scheduleService
                      .findUserById(userbyEmail?.UserId)
                      .then((user) => {
                        if(user) {
                          req.body.UserId = userbyEmail.UserId;
                          return this.scheduleService
                          .createFAndB(req.body)
                          .then((user) => {
                            return res.status(200).json(user);
                          })
                          .catch((error: Error) => {
                            return res.status(500).json({ error: error });
                          });
                        }
                        else {
                          return res.status(404).json("User not exists!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                    }
                    else {
                      return res.status(404).json("User not exists!");
                    }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });
            }
        });
    }
    else {
        return res.status(400).json("No token exists!");
    }
};

public getFAndB = async(req: Request, res: Response): Promise<Response | void> => {
    if(req.headers.authorization) {
        jwt.verify(req.headers.authorization, process.env.SECRET_KEY!, (error, user: any) => {
            if(error) {
                return res.status(400).json("Invalid Login!");
            }
            else {
                return this.scheduleService
                  .findByEmail(user.Email)
                  .then((user) => {
                      if(!user) {
                          return res.status(404).json("No user found!");
                      }
                      else {
                          return this.scheduleService
                            .getFAndB(user.UserId)
                            .then(async (user) => {
                                let sp = [];
                                if(!user) {
                                    return res.status(404).json("No user found!");
                                }
                                else {
                                    let favSP = await this.scheduleService.getTargetUser(user);
                                    if(favSP.length > 0) {
                                        return this.scheduleService
                                          .findById(favSP)
                                          .then((helper) => {
                                              return res.status(200).json(helper);
                                          })
                                          .catch((error: Error) => {
                                            return res.status(500).json({ error: error });
                                          });
                                    }
                                    else {
                                        return res.status(404).json("Favourite service provider not found!");
                                    }
                                }
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                              });
                      }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });
            }
        });
    }
    else {
        return res.status(400).json("No token exists!");
    }
};
}