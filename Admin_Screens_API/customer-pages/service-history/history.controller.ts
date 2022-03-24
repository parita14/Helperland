import { Request, Response, NextFunction } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { HistoryService } from "./history.service";
import jwt from "jsonwebtoken";
require('dotenv').config();
import moment from "moment";
import exceljs from "exceljs";

export class HistoryController {
    public constructor(private readonly historyService: HistoryService) {
        this.historyService = historyService;
    }

    public history = async(req: Request, res: Response): Promise<Response | undefined> => {
        let serviceRequest: ServiceRequest[] = [];
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.historyService
                      .findUser(user.Email)
                      .then((user) => {
                        if(user?.UserTypeId === 1) {
                            return this.historyService
                            .getAllPastRequest(user.UserId)
                            .then(async (service) => {
                                if(service) {
                                    if(service.length > 0) {
                                        const serviceDetails = await this.historyService.serviceReq(service);
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
                    return this.historyService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 1) {
                            return this.historyService
                            .getServiceById(+req.params.ServiceId)
                            .then(async (service) => {
                                let Status;
                                let details : Object[] = [];
                                if(service) {
                                    const userdetails = await this.historyService.findCustById(service.UserId);
                                    const addressdetails = await this.historyService.findAddressById(service.ServiceRequestId);
                                    const extradetails = await this.historyService
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

                                    if(service.Status === 3) {
                                        Status = 'Cancelled';
                                    }
                                    else if(service.Status === 2) {
                                        Status = 'Completed';
                                    }
                                    else {
                                        Status = null;
                                    }

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
                                                Status: Status
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

    public giveRatings = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        req.body.RatingDate = new Date();

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.historyService
                      .findUser(user.Email)
                      .then((user) => {
                          if(user?.UserTypeId === 1) {
                            return this.historyService
                              .getRatingsById(+req.params.ServiceRequestId)
                              .then((rating) => {
                                  if(rating) {
                                      return res.status(400).json("You already gave Ratings!");
                                  }
                                  else {
                                      if(req.params.ServiceRequestId) {
                                          return this.historyService
                                            .getServiceByRequestId(+req.params.ServiceRequestId)
                                            .then((service) => {
                                                if(service) {
                                                    req.body.ServiceRequestId = service.ServiceRequestId;
                                                    if(user.UserTypeId === 1 && user.UserId === service.UserId) {
                                                        req.body.RatingFrom = service.UserId;
                                                        if(service.Status === 2 && service.ServiceProviderId) {
                                                            req.body.RatingTo = service.ServiceProviderId;
                                                            req.body.Ratings = this.historyService.getRatings(req.body);
                                                            return this.historyService
                                                              .giveRatings(req.body)
                                                              .then((ratings) => {
                                                                return res.status(200).json(ratings);
                                                              })
                                                              .catch((error: Error) => {
                                                                return res.status(500).json({ error: error });
                                                              });
                                                        }
                                                        else {
                                                            return res.status(400).json("Service Request not completed or ServiceProvider Not found!");
                                                        }
                                                    }
                                                    else {
                                                        return res.status(400).json("Please login using your cutomer account!");
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
                                          return res.status(400).json("Service Request Id not exists!");
                                      }
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

    public export = async(req: Request, res: Response): Promise<Response | undefined> => {
        let exportHistory = [];
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.historyService
                      .findUser(user.Email)
                      .then(async (user) => {
                          if(user && user.UserTypeId === 1) {
                              return this.historyService
                                .getAllPastRequest(user.UserId)
                                .then(async (history) => {
                                    if(history.length > 0) {
                                        const pastHistory = this.historyService.Export(history);
                                        exportHistory = await pastHistory;
                                        let workbook = new exceljs.Workbook();
                                        let worksheet = workbook.addWorksheet('Service History');
                                        worksheet.columns = [
                                            {header: 'ServiceID', key: 'ServiceID', width: 10},
                                            {header: 'ServiceStartDate', key: 'ServiceStartDate', width: 15},
                                            {header: 'Duration', key: 'Duration', width: 18},
                                            {header: 'ServiceProvider', key: 'ServiceProvider', width: 25},
                                            {header: 'Payment', key: 'Payment', width: 10},
                                            {header: 'Status', key: 'Status', width: 12}
                                        ];
                                        worksheet.addRows(exportHistory);

                                        worksheet.getRow(1).eachCell((cell) => {
                                            cell.font = {bold: true};
                                        });

                                        workbook.xlsx.writeFile('ServiceHistory_' + user.UserId + '.xlsx')
                                        .then((service) => {
                                            return res.status(200).json("Data exported successfully!");
                                        })
                                        .catch((error: Error) => {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("No requests found!");
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
                        console.log(error);
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