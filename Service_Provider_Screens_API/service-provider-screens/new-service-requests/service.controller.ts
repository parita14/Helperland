import { Request, Response, NextFunction } from "express";
import { ServiceService } from "./service.service";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

export class ServiceController {
    public constructor(private readonly serviceService: ServiceService) {
        this.serviceService = serviceService;
    }

    public newServices = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 2) {
                            return this.serviceService
                            .getAllFutureRequest(findUser.ZipCode, findUser.UserId)
                            .then(async (service) => {
                                if(service && service.length > 0) {
                                    const serviceDetails = await this.serviceService.serviceReq(service);
                                    if(serviceDetails.length > 0) {
                                        return res.status(200).json(serviceDetails);    
                                    }      
                                    else {
                                        return res.status(404).json("Service not exists!");
                                    }
                                }
                                else {
                                    return res.status(400).json("No service exists!");
                                }
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(400).json("You are not SP, Please login with your SP account!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public getServiceById = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.serviceService
                            .getServiceById(+req.params.ServiceId, findUser.ZipCode)
                            .then(async (service) => {
                                let details : Object[] = [];
                                if(service) {
                                    const userdetails = await this.serviceService.findUserById(service.UserId);
                                    const addressdetails = await this.serviceService.findAddressById(service.ServiceRequestId);
                                    const extradetails = await this.serviceService
                                      .findExtraById(service.ServiceRequestId)
                                      .then((extra) => {
                                          let ExtraService: Object[] = [];
                                          if(extra) {
                                            for(var i=0; i<extra.length; i++) {
                                                const extras = extra[i].ServiceExtraId;
                                                ExtraService.push(extras);
                                            }
                                            return ExtraService;
                                          }
                                      });
                                    const Time = (service.ServiceHours);
                                    const Extra = (service.ExtraHours);
                                    const StartTime = ((service.ServiceStartTime).toString().split(':'));
                                    const total = ((Time+Extra!).toString()).split('.');
                                    var time:string ;
                                    if(StartTime[1] == "30"){
                                        if(total[1] == '5'){
                                            time = (((+StartTime[0])+(+total[0])+1).toString())+":00";
                                        }
                                        else{
                                            time = (((+StartTime[0])+(+total[0])).toString())+":30";
                                        }
                                    }
                                    else{
                                        if(total[1] == '5'){                        
                                            time = (((+StartTime[0])+(+total[0])).toString())+":30";
                                        }
                                        else{
                                            time = (((+StartTime[0])+(+total[0])).toString())+":00";
                                        } 
                                    }
                                    service.update({EndTime:time});

                                    if(userdetails) {
                                        if(addressdetails) {
                                            await details.push({
                                                ServiceStartDate: service.ServiceStartDate,
                                                ServiceTime: service.ServiceStartTime + " - " + time,
                                                Duration: service.ServiceHours + service.ExtraHours!,
                                                ServiceID: service.ServiceId,
                                                Extras: extradetails,
                                                Payment: service.TotalCost + " €",
                                                CustomerName: userdetails.FirstName + " " + userdetails.LastName,
                                                ServiceAddress: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                                                Comments: service.Comments,
                                            });
                                        }
                                    }

                                    if(details.length > 0) {
                                        return res.status(200).json(details);    
                                    }      
                                    else {
                                        return res.status(404).json("Service not exists!");
                                    }
                                }
                                else {
                                    return res.status(404).json("No service request detail found with this service ID!");
                                }
                            })
                            .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            });
                          }
                          else {
                            return res.status(400).json("You are not SP, Please login with your SP account!");
                          }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public acceptValidService = async(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.serviceService
                            .getServiceById(+req.params.ServiceId, findUser.ZipCode)
                            .then((service) => {
                                if(service) {
                                    req.body.ZipCode = service.ZipCode;
                                    return this.serviceService
                                      .findServiceOfHelper(findUser.UserId)
                                      .then(async (serviceReq) => {
                                          req.body.totalHour = service.ExtraHours! + service.ServiceHours;
                                        if(serviceReq) {
                                            const { srId, matched } = await this.serviceService.helperHasFutureSameDateAndTime( service.ServiceStartDate, serviceReq, req.body.totalHour, service.ServiceStartTime );
                                            if(matched) {
                                                return res.status(200).json(`Another Service Request of ServiceId #${srId} has already been assigned which has time overlap with service request. You can't pick this one!`);
                                            }
                                            else {
                                                next();
                                            }
                                        }
                                        else {
                                            next();
                                        }
                                      })
                                      .catch((error: Error) => {
                                          return res.status(500).json({ error: error });
                                      });
                                }
                                else {
                                    return res.status(404).json("Service is assigned to another service provider!");
                                }
                            })
                            .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            });
                          }
                          else {
                            return res.status(400).json("You are not SP, Please login with your SP account!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(404).json("No token exists!!");
        }
    };

    public acceptService = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.serviceService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.serviceService
                                .updateServiceStatus(+req.params.ServiceId, req.body.ZipCode, findUser.UserId)
                                .then((s) => {
                                    if(s) {
                                        return this.serviceService
                                        .findAllSP(req.body.ZipCode)
                                        .then(async (sp) => {
                                            if(sp) {
                                                const users = sp.filter((s) => {
                                                    return findUser.UserId !== s.UserId;
                                                });
                                                let email  =await this.serviceService.getEmail(users, req.body);
                                                for(let e in email) {
                                                    const serviceReq = await this.serviceService.newservice(email[e], +req.params.ServiceId);
                                                    await mg.messages().send(serviceReq);
                                                }
                                            }
                                            return res.status(200).json("Service Request is accepted by you successfully!");
                                    })
                                    .catch((error: Error) => {
                                        return res.status(500).json({ error: error });
                                    });
                                    }
                                    else {
                                        return res.status(400).json("Error in accepting service!");
                                    }
                                })
                                .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                });
                          }
                          else {
                            return res.status(400).json("You are not SP, Please login with your SP account!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(404).json("No token exists!!");
        }
    };

}