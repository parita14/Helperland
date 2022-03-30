import { Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";
require('dotenv').config();
import exceljs from "exceljs";

export class UserController {
    public constructor(private readonly userService: UserService) {
        this.userService = userService;
    }

    public getAllUsers = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.userService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 3) {
                            return this.userService
                              .findAllUsers()
                              .then(async (users) => {
                                  if(users) {
                                    let services = users.filter((x) => {
                                        return (!req.body.UserName || (x.FirstName + " " + x.LastName && x.FirstName + " " + x.LastName === req.body.UserName)) &&
                                               (!(req.body.UserType === 'Customer') || (x.UserTypeId === 1 && x.UserTypeId === 1)) &&
                                               (!(req.body.UserType === 'Service Provider') || (x.UserTypeId === 2 && x.UserTypeId === 2)) &&
                                               (!req.body.Phone || (x.Mobile && x.Mobile === req.body.Phone)) &&
                                               (!req.body.PostalCode || (x.ZipCode && x.ZipCode === req.body.PostalCode)) &&
                                               (!req.body.Email || (x.Email && x.Email === req.body.Email)) &&
                                               (!req.body.FromDate || (x.DateOfRegistration && x.DateOfRegistration >= req.body.FromDate)) &&
                                               (!req.body.ToDate || (x.DateOfRegistration && x.DateOfRegistration <= req.body.ToDate));
                                    });
                                    const userDetails = await this.userService.userdetails(services);
                                        if(userDetails.length > 0) {
                                            return res.status(200).json(userDetails);    
                                        }      
                                        else {
                                            return res.status(404).json("User not exists!");
                                        }
                                  }
                                  else {
                                      return res.status(404).json("No user exists!");
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

    public updateUserStatus = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.userService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 3) {
                            if(req.body.Email) {
                                return this.userService
                                  .findUser(req.body.Email)
                                  .then((userbyEmail) => {
                                      if(userbyEmail) {
                                        if(userbyEmail.IsApproved) {
                                            return this.userService
                                            .deactivateUser(req.body.Email)
                                            .then((u) => {
                                                if(u) {
                                                    return res.status(200).json(`User ${userbyEmail.FirstName + " " + userbyEmail.LastName} deactivated successfully!`);
                                                }
                                                else {
                                                    return res.status(400).json("Updation failed!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            return this.userService
                                            .activateUser(req.body.Email)
                                            .then((u) => {
                                                if(u) {
                                                    return res.status(200).json(`User ${userbyEmail.FirstName + " " + userbyEmail.LastName} activated successfully!`);
                                                }
                                                else {
                                                    return res.status(400).json("Updation failed!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                      }
                                      else {
                                          return res.status(404).json("No user found with this Email");
                                      }
                                  })
                                  .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                  });
                            }
                            else {
                                return res.status(400).json("Please write Email");
                            }
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

    public export = async(req: Request, res: Response): Promise<Response | undefined> => {
        let exportusers = [];
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.userService
                      .findUser(user.Email)
                      .then(async (findUser) => {
                          if(findUser && findUser.UserTypeId === 3) {
                              this.userService
                                .findAllUsers()
                                .then(async (allUsers) => {
                                    if(allUsers.length > 0) {
                                        exportusers = await this.userService.Export(allUsers);
                                        let workbook = new exceljs.Workbook();
                                        let worksheet = workbook.addWorksheet('All Users');
                                        worksheet.columns = [
                                          {header: 'UserName', key: 'UserName', width: 15},
                                          {header: 'DateOfRegistration', key: 'DateOfRegistration', width: 15},
                                          {header: 'UserType', key: 'UserType', width: 15},
                                          {header: 'Phone', key: 'Phone', width: 15},
                                          {header: 'PostalCode', key: 'PostalCode', width: 12},
                                          {header: 'Status', key: 'Status', width: 10}
                                        ];
                                        worksheet.addRows(exportusers);
          
                                        worksheet.getRow(1).eachCell((cell) => {
                                          cell.font = {bold: true};
                                        });
          
                                        workbook.xlsx.writeFile('All_Users' + '.xlsx')
                                        .then((service) => {
                                          return res.status(200).json("Data exported successfully!");
                                        })
                                        .catch((error: Error) => {
                                            console.log(error);
                                          return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("No users found!");
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