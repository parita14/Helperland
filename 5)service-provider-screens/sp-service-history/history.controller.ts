import { Request, Response } from "express";
import { SpHistoryService } from "./history.service";
import jwt from "jsonwebtoken";
import exceljs from "exceljs";
require('dotenv').config();

export class SpHistoryController {
    public constructor(private readonly spHistoryService: SpHistoryService) {
        this.spHistoryService = spHistoryService;
    }

    public spHistory = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.spHistoryService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 2) {
                            return this.spHistoryService
                            .getAllCompletedRequest(findUser.UserId, findUser.ZipCode)
                            .then(async (service) => {
                                if(service && service.length > 0) {
                                    const serviceDetails = await this.spHistoryService.serviceReq(service);
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
                            return res.status(400).json("You are not SP, Please login with you SP account!");
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
                    return this.spHistoryService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser?.UserTypeId === 2) {
                            return this.spHistoryService
                            .getServiceById(+req.params.ServiceId, findUser.UserId, findUser.ZipCode)
                            .then(async (service) => {
                                let details : Object[] = [];
                                if(service) {
                                    const userdetails = await this.spHistoryService.findUserById(service.UserId);
                                    const addressdetails = await this.spHistoryService.findAddressById(service.ServiceRequestId);
                                    const extradetails = await this.spHistoryService
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

    public export = async(req: Request, res: Response): Promise<Response | undefined> => {
        let exportHistory = [];
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.spHistoryService
                      .findUser(user.Email)
                      .then(async (findUser) => {
                          if(findUser && findUser.UserTypeId === 2) {
                              return this.spHistoryService
                                .getAllCompletedRequest(findUser.UserId, findUser.ZipCode)
                                .then(async (history) => {
                                    if(history.length > 0) {
                                        const pastHistory = this.spHistoryService.compareDate(history);
                                        exportHistory = await this.spHistoryService.Export(pastHistory);
                                        let workbook = new exceljs.Workbook();
                                        let worksheet = workbook.addWorksheet('Service History');
                                        worksheet.columns = [
                                          {header: 'Service Id', key: 'ServiceId', width: 10},
                                          {header: 'Service Date', key: 'StartDate', width: 18},
                                          {header: 'Duration', key: 'Duration', width: 18},
                                          {header: 'Customer Name', key: 'CustomerName', width: 18},
                                          {header: 'Customer Details', key: 'Address', width: 25}
                                        ];
                                        worksheet.addRows(exportHistory);
          
                                        worksheet.getRow(1).eachCell((cell) => {
                                          cell.font = {bold: true};
                                        });
          
                                        workbook.xlsx.writeFile('SP_ServiceHistory_' + findUser.UserId + '.xlsx')
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