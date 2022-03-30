import { Request, Response, NextFunction } from "express";
import { rAndbService } from "./r&b.service";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class rAndbController {
    public constructor(private readonly rAndbService: rAndbService) {
        this.rAndbService = rAndbService;
    }

    public getAllRatings = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.rAndbService
                      .findUser(user.Email)
                      .then((findUser) => {
                        if(findUser?.UserTypeId === 2) {
                            return this.rAndbService
                            .getAllRatings(findUser.UserId)
                            .then(async (ratings) => {
                                if(ratings && ratings.length > 0) {
                                    const getAllRatings = await this.rAndbService.Ratings(ratings);
                                    if(getAllRatings.length > 0) {
                                        return res.status(200).json(getAllRatings);
                                    }
                                    else {
                                        return res.status(404).json("No ratings found!");
                                    }
                                }
                                else {
                                    return res.status(400).json("No rating exists!");
                                }
                            })
                            .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(400).json("You are not SP, Please login with you SP account!");
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

    public custSpHadWorkedFor = async (req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.rAndbService
                      .findUser(user.Email)
                      .then(async (findUser) => {
                          if(findUser && findUser.UserTypeId === 2) {
                                const cust = await this.rAndbService.findAllcustSpHadWorkedFor(findUser.UserId);
                                if(cust) {
                                    if(cust.length > 0) {
                                        return res.status(200).json(cust);
                                    }
                                    else {
                                        return res.status(404).json("Customer not found!");
                                    }
                                }
                                else {
                                    return res.status(404).json("No customer exists!");
                                }
                            }
                            else {
                                return res.status(404).json("User not exists!");
                            }
                      })
                      .catch((error: Error) => {
                          return res.status(500).json(error);
                      });
                }
            });
        }
        else {
            return res.status(404).json("No token exists!");
        }
    };

    public blockCust = async ( req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.rAndbService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser && findUser.UserTypeId === 2) {
                            req.body.UserId = findUser.UserId;
                            req.body.TargetUserId = req.params.custId;
                            return this.rAndbService
                              .findServiceBySpId(findUser.UserId)
                              .then((service) => {
                                  if(service) {
                                    const cId = this.rAndbService.findAllcustIdSpHadWorkedFor(service);
                                    if(cId.length > 0) {
                                        const custArray = cId.includes(parseInt(req.params.custId));
                                        if(custArray) {
                                            if(req.body.IsBlocked) {
                                                return this.rAndbService
                                                  .findBlockedCust(findUser.UserId, req.body.TargetUserId)
                                                  .then((customer) => {
                                                      if(customer) {
                                                        if(customer.IsBlocked) {
                                                            return res.status(400).json("Customer already in blocked list!");
                                                        }
                                                        else {
                                                            return this.rAndbService
                                                              .updateBlockedCust(req.body)
                                                              .then((updateCust) => {
                                                                  if(updateCust.length > 0) {
                                                                      return res.status(200).json("Customer addedd in blocked list!");
                                                                  }
                                                                  else {
                                                                      return res.status(400).json("Failure in adding customer in blocked list!");
                                                                  }
                                                              })
                                                              .catch((error: Error) => {
                                                                return res.status(500).json(error);
                                                              });
                                                        }
                                                      }
                                                      else {
                                                        req.body.IsFavorite = false;
                                                        return this.rAndbService
                                                          .createBlockedCust(req.body)
                                                          .then((blockedCust) => {
                                                              if(blockedCust) {
                                                                  return res.status(200).json("Blocked customer created successfully!");
                                                              }
                                                              else {
                                                                  return res.status(404).json("Failure in creating blocked customer!");
                                                              }
                                                          })
                                                          .catch((error: Error) => {
                                                            return res.status(500).json(error);
                                                          });
                                                      }
                                                  })
                                                  .catch((error: Error) => {
                                                      return res.status(500).json(error);
                                                  });
                                            }
                                            else if(req.body.IsBlocked === false) {
                                                next();
                                            }
                                            else {
                                                return res.status(404).json("Not Found!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("Service Provider not worked for customer in past!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("SP not worked with any customer in past!");
                                    }
                                  }
                                  else {
                                      return res.status(404).json("Service not exists!");
                                  }
                              })
                              .catch((error: Error) => {
                                return res.status(500).json(error);
                              });
                          }
                          else {
                              return res.status(404).json("No Sp exists!");
                          }
                      })
                      .catch((error: Error) => {
                          return res.status(500).json(error);
                      });
                }
            });
        }
        else {
            return res.status(404).json("No token exists!");
        }
    };

    public removeBlockedCust = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.rAndbService
                      .findUser(user.Email)
                      .then((findUser) => {
                          if(findUser && findUser.UserTypeId === 2) {
                            return this.rAndbService
                              .findBlockedCust(findUser.UserId, req.body.TargetUserId)
                              .then((blocked) => {
                                  if(blocked) {
                                    if(blocked.IsBlocked) {
                                        return this.rAndbService
                                          .updateBlockedCust(req.body)
                                          .then((blockedCust) => {
                                              if(blockedCust) {
                                                  return res.status(200).json("Blocked Customer updated successfully!");
                                              }
                                              else {
                                                  return res.status(400).json("Updation failed!");
                                              }
                                          })
                                          .catch((error: Error) => {
                                            return res.status(500).json(error);
                                          });
                                    }
                                    else if(blocked.IsBlocked === false) {
                                        return res.status(400).json("Customer already in unblocked list!");
                                    }
                                    else {
                                        return res.status(404).json("No customer exists to remove!");
                                    }
                                  }
                                  else {
                                    return res.status(404).json("No customer exists!");
                                  }
                              })
                              .catch((error: Error) => {
                                return res.status(500).json(error);
                              });
                          }
                          else {
                              return res.status(404).json("No Sp Exists!");
                          }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json(error);
                      });
                }
            });
        }
        else {
            return res.status(404).json("No token exists!");
        }
    };

}