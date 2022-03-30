import { Request, Response, NextFunction } from "express";
import { DashboardService } from "./dashboard.service";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});


require('dotenv').config();

export class DashboardController {
    public constructor(private readonly dashboardService: DashboardService) {
        this.dashboardService = dashboardService;
    }

    public dashboard = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.dashboardService
                      .findUser(user.Email)
                      .then((user) => {
                        if(user?.UserTypeId === 1) {
                            return this.dashboardService
                            .getAllFutureRequest(user.UserId)
                            .then(async (service) => {
                                if(service) {
                                    if(service.length > 0) {
                                        const serviceDetails = await this.dashboardService.serviceReq(service);
                                        if(serviceDetails.length > 0) {
                                            return res.status(200).json(serviceDetails);    
                                        }      
                                        else {
                                            return res.status(404).json("Service not exists!");
                                        }
                                    }
                                    else {
                                        return res.status(400).json("No service exists!!");
                                    }
                                }
                                else {
                                    return res.status(400).json("No service exists!!!");
                                }
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(400).json("You are not Customer, Please login with you customer account!");
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
                    return this.dashboardService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 1) {
                            return this.dashboardService
                            .getServiceById(+req.params.ServiceId)
                            .then(async (service) => {
                                let details : Object[] = [];
                                if(service) {
                                    const userdetails = await this.dashboardService.findCustById(service.UserId);
                                    const addressdetails = await this.dashboardService.findAddressById(service.ServiceRequestId);
                                    const extradetails = await this.dashboardService
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
                                            time = (((+StartTime[0])+(+total[0])+1).toString())+":00:00";
                                        }
                                        else{
                                            time = (((+StartTime[0])+(+total[0])).toString())+":30:00";
                                        }
                                    }
                                    else{
                                        if(total[1] == '5'){                        
                                            time = (((+StartTime[0])+(+total[0])).toString())+":30:00";
                                        }
                                        else{
                                            time = (((+StartTime[0])+(+total[0])).toString())+":00:00";
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
                                                ServiceAddress: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                                                Phone: userdetails.Mobile,
                                                Email: userdetails.Email,
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
                            return res.status(400).json("You are not Customer, Please login with your Customer account!");
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

    public rescheduleService = async(req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');
        const isTrue = this.dashboardService.compareDate(req.body.ServiceStartDate);

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    if(isTrue) {
                        return this.dashboardService
                          .findUser(user.Email)
                          .then((user) => {
                              if(user && user.UserTypeId === 1) {
                                  return this.dashboardService
                                    .findServiceById(+req.params.ServiceId)
                                    .then((service) => {
                                        if(service) {
                                            req.body.totalHour = service.ServiceHours + service.ExtraHours!;
                                            if(service.UserId === user.UserId) {
                                                if(service.ServiceProviderId) {
                                                    req.body.ServiceProviderId = service.ServiceProviderId;
                                                    return this.dashboardService
                                                      .findByAllSPId(service.ServiceProviderId)
                                                      .then(async (serviceReq) => {
                                                          if(serviceReq) {
                                                              const { startDate,  isMatch, startTime, endTime } = 
                                                                await this.dashboardService
                                                                  .SPHasFutureSameDateTime (req.body.ServiceStartDate, serviceReq, req.body.totalHour, req.body.ServiceStartTime);
                                                                  if(isMatch) {
                                                                      return res.status(200).json("Another service request has been assigned to the service provider on " + startDate +" from " + startTime +
                                                                      " to " + endTime +". Either choose another date or pick up a different time slot.");
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
                                                    next();
                                                }
                                            }
                                            else {
                                                return res.status(404).json("User not exists!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("No service exists!");
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
                    else {
                        return res.status(400).json("Enter Correct date i.e. date greater than today's date!");
                    }
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        } 
    };

    public rescheduleIfTimeSlotNotConflicts = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    if(req.params.ServiceId) {
                        return this.dashboardService
                          .findUser(user.Email)
                          .then((finduser) => {
                              if(finduser) {
                                  const date = req.body.ServiceStartDate;
                                return this.dashboardService
                                .updateService(+req.params.ServiceId, new Date(date), req.body.ServiceStartTime)
                                .then((service) => {
                                    if(service.length > 0) { 
                                            return this.dashboardService
                                            .findServiceById(+req.params.ServiceId)
                                            .then(async (helper) => {
                                                if(helper?.ServiceProviderId) {
                                                    return this.dashboardService
                                                      .findSPById(helper.ServiceProviderId)
                                                      .then(async (sp) => {
                                                        if(sp?.Email) {
                                                            const email = await this.dashboardService.rescheduleService(req.body.ServiceStartDate, req.body.ServiceStartTime, sp.Email, +req.params.ServiceId);
                                                            await mg.messages().send(email);
                                                            return res.status(200).json("Service Request rescheduled successfully!");
                                                        }
                                                      })
                                                      .catch((error: Error) => {
                                                        console.log(error);
                                                        return res.status(500).json({ error: error });
                                                      });
                                                }
                                                else {
                                                    return res.status(200).json("Service Request rescheduled successfully!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                              console.log(error);
                                              return res.status(500).json({ error: error });
                                            });
                                    }
                                    else {
                                        return res.status(400).json("Failed Rescheduling Service!");
                                    }
                                })
                                .catch((error: Error) => {
                                  console.log(error);  
                                  return res.status(500).json({ error: error });
                                });
                              }
                              else {
                                  return res.status(404).json("User not exists!");
                              }
                          })
                          .catch((error: Error) => {
                            console.log(error);  
                            return res.status(500).json({ error: error });
                          });
                    }
                    else {
                        return res.status(404).json("ServiceId not exists!");
                    }
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public cancleServiceRequest = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    if(!req.body.Reason) {
                        return res.status(400).json("Write Reason for cancelling Service!");
                    }
                    return this.dashboardService
                      .findUser(user.Email)
                      .then((user) => {
                          if(user?.UserTypeId === 1) {
                            return this.dashboardService
                            .getServiceById(+req.params.ServiceId)
                            .then((service) => {
                              if(user.UserId === service?.UserId) {
                                if(service?.Status === 3) {
                                    return res.status(400).json("Service request already cancelled!");
                                }
                                else {
                                    if(service.Status !== 2) {
                                        for(let s in service) {
                                            return this.dashboardService
                                            .updateServiceStatus(+req.params.ServiceId)
                                            .then((serviceRequest) => {
                                                if(serviceRequest.length > 0) {
                                                    if(service.ServiceProviderId) {
                                                        return this.dashboardService
                                                          .findSPById(service.ServiceProviderId)
                                                          .then(async (helper) => {
                                                              if(helper?.Email) {
                                                                  const email = await this.dashboardService.cancleService(helper.Email, service.ServiceId, req.body.Reason)
                                                                  await mg.messages().send(email);
                                                                  return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
                                                              }
                                                              else {
                                                                  return res.status(404).json("Helper not found!");
                                                              }
                                                          })
                                                          .catch((error: Error) => {
                                                            return res.status(500).json({ error: error });
                                                        });
                                                    }
                                                    else {
                                                        return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
                                                    }
                                                }
                                                else {
                                                    return res.status(400).json("Cancellation of service is failed!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                    }
                                    else {
                                        return res.status(400).json("Service Request is completed, You can't cancle it!");
                                    }
                                }
                              }
                              else {
                                  return res.status(404).json("No service exists!");
                              }
                            })
                            .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            });
                          }
                          else {
                            return res.status(400).json("You are not Customer, Please login with you customer account!");
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