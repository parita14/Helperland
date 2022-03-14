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
                                        for(let s in service) {
                                            // const date1 = new Date(service[s].ServiceStartDate);
                                            // const date2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
                                            // if(date1 <= date2) {
                                                serviceRequest.push(service[s]);
                                            // }
                                        }
                                        if(serviceRequest.length > 0) {
                                            return res.status(200).json({ serviceRequest });
                                        }
                                        else {
                                            return res.status(400).json("No service exists!");
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
                      .then((user) => {
                          if(user?.UserTypeId === 1) {
                            return this.historyService
                            .getServiceById(+req.params.ServiceId)
                            .then((service) => {
                                if(service) {
                                    if(user.UserId === service.UserId) {
                                        return res.status(200).json(service);
                                    }
                                    else {
                                        return res.status(404).json("No service request detail found with this service ID!");
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
                              const data = await this.historyService.getAllPastRequest(user.UserId);
                              const workbook = new exceljs.Workbook();
                              const worksheet = workbook.addWorksheet('Service History');
                              worksheet.columns = [
                                {header: 'Id', key: 'Id', width: 10},
                                {header: 'ServiceId', key: 'ServiceId', width: 10},
                                {header: 'ServiceStartDate', key: 'ServiceStartDate', width: 18},
                                {header: 'ServiceStartTime', key: 'ServiceStartTime', width: 18},
                                {header: 'ServiceProviderId', key: 'ServiceProviderId', width: 18},
                                {header: 'TotalCost', key: 'TotalCost', width: 10},
                                {header: 'Status', key: 'Status', width: 10}
                              ];
                              let count = 1;
                              data.forEach(d => {
                                (d as any).Id = count;
                                worksheet.addRow(d);
                                count += 1;
                              });

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