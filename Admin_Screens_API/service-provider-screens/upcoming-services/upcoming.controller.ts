import { Request, Response } from "express";
import { UpcomingService } from "./upcoming.service";
import jwt from "jsonwebtoken";
import mailgun from "mailgun-js";
import moment from "moment";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

export class UpcomingController {
    public constructor(private readonly upcomingService: UpcomingService) {
        this.upcomingService = upcomingService;
    }

    public upcomingServices = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.upcomingService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 2) {
                            return this.upcomingService
                            .getAllUpcomingRequest(findUser.ZipCode)
                            .then(async (service) => {
                                if(service && service.length > 0) {
                                    const serviceDetails = await this.upcomingService.serviceReq(service);
                                    if(serviceDetails.length > 0) {
                                        return res.status(200).json(serviceDetails);    
                                    }      
                                    else {
                                        return res.status(404).json("Service not exists!");
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
                    return this.upcomingService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.upcomingService
                            .getServiceById(+req.params.ServiceId, findUser.ZipCode)
                            .then(async (service) => {
                                let details : Object[] = [];
                                if(service) {
                                    const userdetails = await this.upcomingService.findUserById(service.UserId);
                                    const addressdetails = await this.upcomingService.findAddressById(service.ServiceRequestId);
                                    const extradetails = await this.upcomingService
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
                    return this.upcomingService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.upcomingService
                            .getServiceById(+req.params.ServiceId, findUser.ZipCode)
                            .then((service) => {
                              if(findUser.UserId === service?.ServiceProviderId) {
                                    for(let s in service) {
                                        return this.upcomingService
                                        .updateServiceStatus(+req.params.ServiceId)
                                        .then((serviceRequest) => {
                                            if(serviceRequest.length > 0) {
                                                if(service.UserId) {
                                                    return this.upcomingService
                                                        .findCustById(service.UserId)
                                                        .then(async (cust) => {
                                                            if(cust?.Email) {
                                                                const email = await this.upcomingService.cancleService(cust.Email, service.ServiceId, req.body.Reason)
                                                                await mg.messages().send(email);
                                                                return res.status(200).json(`Service Request with Service Id #${service.ServiceId} cancelled successfully!`);
                                                            }
                                                            else {
                                                                return res.status(404).json("Customer not found!");
                                                            }
                                                        })
                                                        .catch((error: Error) => {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else {
                                                    return res.status(400).json("Invalid Service Request!");
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
                                  return res.status(404).json("No service exists!");
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

    public completeService = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.upcomingService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.upcomingService
                            .getServiceById(+req.params.ServiceId, findUser.ZipCode)
                            .then(async (service) => {
                                if(service) {
                                    const date1 = new Date(service.ServiceStartDate);
                                    const date2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
                                    
                                    if(date1.getTime() === date2.getTime()) {
                                        const Time = (service.ServiceHours);
                                        const Extra = (service.ExtraHours);
                                        const startTime = ((service.ServiceStartTime).toString().split(':'))
                                        const total = ((Time+Extra!).toString()).split('.');
                                        var time: string ;
                                        if(startTime[1] == "30"){
                                            if(total[1] == '5'){
                                                time = (((+startTime[0])+(+total[0])+1).toString())+":00";
                                            }
                                            else{
                                                time = (((+startTime[0])+(+total[0])).toString())+":30";
                                            }
                                        }
                                        else{
                                            if(total[1] == '5'){
                                                time = (((+startTime[0])+(+total[0])).toString())+":30";
                                            }
                                            else{
                                                time = (((+startTime[0])+(+total[0])).toString())+":00";
                                            } 
                                        }
                                        await service.update({EndTime: time});

                                        const currentHour = new Date().getHours();
                                        const currentMinute = new Date().getMinutes();
                                        const timeHour = time.split(":")[0];
                                        const timeMinutes = time.split(":")[1];
                                        const servicetime = timeHour + "." + timeMinutes;
                                        const currentTime = currentHour + "." + currentMinute;
                                        
                                        if(servicetime < currentTime) {
                                            return this.upcomingService
                                            .completeService(+req.params.ServiceId)
                                            .then((service) => {
                                                return res.status(200).json("Service Request Completed!");
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            return res.status(400).json("Service Request is not Completed yet!");
                                        }
                                    } 
                                    else if(date1.getTime() < date2.getTime()) {
                                        return this.upcomingService
                                          .completeService(+req.params.ServiceId)
                                          .then((service) => {
                                              return res.status(200).json("Service Request Completed!");
                                          })
                                          .catch((error: Error) => {
                                              return res.status(500).json({ error: error });
                                          });
                                    }
                                    else {
                                        return res.status(400).json("Service is not completed!");
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

}