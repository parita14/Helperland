import { NextFunction, Request, Response } from "express";
import { ScheduleService } from "./schedule.service";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

export class ScheduleController {
  public constructor(private readonly scheduleService: ScheduleService) {
    this.scheduleService = scheduleService;
  }

  public decodeToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const token = req.headers.authorization || req.header('auth');
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
          if(req.body.ServiceProviderId) {
            return this.scheduleService
              .findSpById(req.body.ServiceProviderId)
              .then((helper) => {
                if(helper) {
                  return this.scheduleService
                    .findSpInFav(user.UserId, req.body.ServiceProviderId)
                    .then((fav) => {
                      if(fav) {
                        return this.scheduleService
                          .scheduleService(req.body)
                          .then(async (service) => {
                            if(service) {
                              const email = await this.scheduleService.serviceForSP(helper.Email!, service.ServiceId!);
                              await mg.messages().send(email);
                              return res.status(200).json({ message: "Booking has been successfully submitted!", ServiceId: service.ServiceId });
                            } else {
                              return res.status(400).json("Failure in creating service!");
                            }
                          })
                          .catch((error: Error) => {
                            return res.status(500).json({ error: error });
                          });
                      } else {
                        return res.status(404).json("Service Provider not added in favourite list!");
                      }
                    })
                    .catch((error: Error) => {
                      return res.status(500).json({ error: error });
                    });
                } else {
                  return res.status(404).json("Service Provider not found!");
                }
              })
              .catch((error: Error) => {
                return res.status(500).json({ error: error });
              });
          }
          else {
            return this.scheduleService
              .scheduleService(req.body)
              .then((service) => {
                return this.scheduleService
                  .getSP(service.ZipCode)
                  .then(async (sp) => {
                    if(sp.length > 0) {
                      const SP = await this.scheduleService.removeSPFromCust(user.UserId, sp);
                      return this.scheduleService.findBlockedSp(user.UserId, SP)
                      .then(async (blockSp) => {
                        if(blockSp) {
                          const remove = await this.scheduleService.removeBlockedSp(SP, blockSp);
                          let email = await this.scheduleService.getEmail(remove, req.body);
                          for(let e in email) {
                            const serviceReq = await this.scheduleService.serviceRequest(email[e], service.ServiceId!);
                            await mg.messages().send(serviceReq);
                          }
                        }
                        return res.status(200).json({ message: "Booking has been successfully submitted!", ServiceId: service.ServiceId });
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                    }
                    else {
                      return res.status(404).json("No service provider found!");
                    }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });
              })
              .catch((error: Error) => {
                return res.status(500).json({ error: error });
              });
          }
        })
        .catch((error: Error) => {
          return res.status(500).json({ error: error });
        });
  };

  public getServiceAddresses = async(req: Request, res: Response): Promise<Response | void> => {
    const token = req.headers.authorization || req.header('auth');
    if(token) {
      jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
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
                  .then(async (Address) => {
                    if(Address.length > 0) {
                      const addressDetails = await this.scheduleService.serviceAddress(Address);
                        if(addressDetails.length > 0) {
                            return res.status(200).json(addressDetails);    
                        }      
                        else {
                            return res.status(404).json("Address not exists!");
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

  public getFAndB = async(req: Request, res: Response): Promise<Response | void> => {
    const token = req.headers.authorization || req.header('auth');
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, (error, User: any) => {
            if(error) {
                return res.status(400).json("Invalid Login!");
            }
            else {
                return this.scheduleService
                  .findByEmail(User.Email)
                  .then((finduser) => {
                      if(!finduser) {
                          return res.status(404).json("No user found!");
                      }
                      else {
                          return this.scheduleService
                            .getFAndB(finduser.UserId)
                            .then(async (user) => {
                                if(!user) {
                                    return res.status(404).json("No user found!");
                                }
                                else {
                                    let favSP = await this.scheduleService.getTargetUser(user, User.ZipCode);
                                    if(favSP.length > 0) {
                                        return res.status(200).json(favSP);
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