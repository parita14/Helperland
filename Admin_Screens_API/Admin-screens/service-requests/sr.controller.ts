import { Request, Response, NextFunction } from "express";
import { srService, filterData } from "./sr.service";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

export class srController {
    public constructor(private readonly srService: srService) {
        this.srService = srService;
    }

    public serviceRequests = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        const filterData: filterData = req.body;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.srService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 3) {
                            return this.srService
                                  .findAllService()
                                  .then(async (sr) => {
                                      if(sr && sr.length > 0) {
                                          if(req.body) {
                                            const serviceArray = await this.srService.findService(sr, filterData);
                                            if(serviceArray && serviceArray.length > 0) {
                                                return res.status(200).json(serviceArray);
                                            }
                                            else {
                                                return res.status(200).json("No Filtered service exists!");
                                            }
                                          }
                                          else {
                                            return res.status(200).json(sr);
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
                            return res.status(400).json("You are not Admin, Please login with your Admin account!");
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

    public rescheduleIfTimeSlotNotConflicts = async(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    if(req.params.ServiceRequestId) {
                        return this.srService
                          .findUser(user.Email)
                          .then((finduser) => {
                              if(finduser && finduser.UserTypeId === 3) {
                                const date = req.body.ServiceStartDate;
                                return this.srService
                                  .findBySId(+req.params.ServiceRequestId)
                                  .then((serviceReq) => {
                                      if(!serviceReq) {
                                        return res.status(404).json("No service found with this Id!");
                                      }
                                      if(serviceReq?.Status === 2) {
                                        return res.status(400).json("Service is completed, you can't reschedule it!");
                                      }
                                      else{
                                        if((new Date(req.body.ServiceStartDate).getTime() === new Date(serviceReq?.ServiceStartDate!).getTime()) && (req.body.ServiceStartTime === serviceReq?.ServiceStartTime)) {
                                            return this.srService
                                                .updateAddress(+req.params.ServiceRequestId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City)
                                                .then(async (address) => {
                                                    const email = await this.srService.getEmails(serviceReq!);
                                                    for(let e in email) {
                                                        const sendmail = this.srService.rescheduleWithAddress(date, req.body.ServiceStartTime, email[e], serviceReq?.ServiceId!, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City);
                                                        mg.messages().send(sendmail);
                                                    }
                                                    if(serviceReq?.Status === 3) {
                                                        return this.srService
                                                          .updateStatus(+req.params.ServiceRequestId)
                                                          .then((status) => {
                                                            return res.status(200).json(`Service Request with Service Id #${serviceReq?.ServiceId} rescheduled successfully!`);
                                                          })
                                                          .catch((error: Error) => {
                                                              return res.status(500).json({ error: error });
                                                          });
                                                    }
                                                    return res.status(200).json(`Service Request with Service Id #${serviceReq?.ServiceId} rescheduled successfully!`);
                                                })
                                                .catch((error: Error) => {
                                                    console.log(error);
                                                    return res.status(500).json({ error: error });
                                                });
                                        }
                                        else {
                                            req.body.totalHour = serviceReq?.ServiceHours! + serviceReq?.ExtraHours!;
                                            if(serviceReq?.ServiceProviderId) { 
                                                req.body.ServiceProviderId = serviceReq.ServiceProviderId;
                                                    return this.srService
                                                      .findByAllSPId(serviceReq.ServiceProviderId)
                                                      .then(async (serviceReq) => {
                                                          if(serviceReq) {
                                                              const { startDate,  isMatch, startTime, endTime, ServiceId } = 
                                                                await this.srService
                                                                  .SPHasFutureSameDateTime (req.body.ServiceStartDate, serviceReq, req.body.totalHour, req.body.ServiceStartTime);
                                                                  if(isMatch) {
                                                                      return res.status(200).json(`Another service request of ServiceId #${ServiceId} has been assigned to the service provider on ` + startDate +" from " + startTime +
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
                                            }
                                            else {
                                                next();
                                            }
                                        }
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

    public RescheduleWithAddress = async(req: Request, res: Response): Promise<Response | undefined> => {
        const date = req.body.ServiceStartDate;
        return this.srService
        .findBySId(+req.params.ServiceRequestId)
        .then((service) => {
             if(service) {
                return this.srService
                  .updateService(+req.params.ServiceRequestId, new Date(date), req.body.ServiceStartTime)
                  .then(async (s) => {
                      return this.srService
                          .updateAddress(+req.params.ServiceRequestId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City)
                          .then(async (address) => {
                              const email = await this.srService.getEmails(service!);
                              for(let e in email) {
                                  const sendmail = this.srService.rescheduleWithAddress(date, req.body.ServiceStartTime, email[e], service?.ServiceId!, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City);
                                  mg.messages().send(sendmail);
                              }
                              if(service?.Status === 3) {
                                return this.srService
                                  .updateStatus(+req.params.ServiceRequestId)
                                  .then((status) => {
                                    return res.status(200).json(`Service Request with Service Id #${service?.ServiceId} rescheduled successfully!`);
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
                              }
                              return res.status(200).json(`Service Request with Service Id #${service?.ServiceId} rescheduled successfully!`);
                          })
                          .catch((error: Error) => {
                              console.log(error);
                              return res.status(500).json({ error: error });
                          });
                  })
                  .catch((error: Error) => {
                      console.log(error);
                      return res.status(500).json({ error: error });
                      });
            }
            else {
                return res.status(404).json("No service exists!");
            }
        })
        .catch((error: Error) => {
            return res.status(500).json({ error: error });
        });
                              
    };

    public cancleServiceRequest = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.srService
                      .findUser(user.Email)
                      .then((user) => {
                          if(user?.UserTypeId === 3) {
                            return this.srService
                              .findByServiceId(+req.params.ServiceId)
                              .then((service) => {
                                if(service?.Status === 3) {
                                    return res.status(400).json("Service request already cancelled!");
                                }
                                else {
                                    if(service?.Status !== 2) {
                                        for(let s in service) {
                                            return this.srService
                                              .updateServiceStatus(+req.params.ServiceId)
                                              .then(async (serviceRequest) => {
                                                if(serviceRequest && serviceRequest.length > 0) {
                                                    const email = await this.srService.getEmails(service);
                                                    for(let e in email) {
                                                        const sendmail = this.srService.cancleService(email[e], service.ServiceId);
                                                        mg.messages().send(sendmail);
                                                    }
                                                    return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
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
                            })
                            .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            });
                          }
                          else {
                            return res.status(400).json("You are not Admin, Please login with you Admin account!");
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