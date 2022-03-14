import { Request, Response } from "express";
import { User } from "../../models/user";
import { SettingsService } from "./settings.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserAddress } from "../../models/useraddress";

require('dotenv').config();
const saltRouds: number = 10;

export class SettingsController {
    public constructor(private readonly settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public getUserDetails = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.settingsService
                      .findUserByEmail(user.Email)
                      .then((user) => {
                          if(user && user.UserTypeId === 1) {
                              return res.status(200).json(user);
                          }
                          else {
                              return res.status(404).json("User not exists!");
                          }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(404).json("No token exists!");
        }
    };

    public updateUserDetails = async (req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user:any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    const {Email} = user;
                    if(Email) {
                        const UserEmail = Email;
                        const FirstName = req.body.FirstName;
                        const LastName = req.body.LastName;
                        const Mobile = req.body.Mobile;
                        const DateOfBirth = req.body.DateOfBirth;
                        const LanguageId = req.body.LanguageId
                        return this.settingsService
                          .findUserByEmail(Email)
                          .then((findUser) => {
                            if(findUser) {
                                return this.settingsService
                                  .updateUserDetails( UserEmail, FirstName, LastName, Mobile, DateOfBirth, LanguageId )
                                  .then((user) => {
                                        return res.status(200).json({ 
                                            FirstName: FirstName, 
                                            LastName: LastName,
                                            Email: Email,
                                            Mobile: Mobile,
                                            DateOfBirth: DateOfBirth,
                                            LanguageId: LanguageId 
                                        });
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
                            }
                            else {
                                return res.status(404).json("No user found with this email!");
                            }
                          })
                          .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                          });
                    }
                    else {
                        return res.status(404).json("No email found!");
                    }
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public createUserAddress = async(req: Request, res: Response) => {
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
               if(error) {
                return res.status(400).json("Invalid login!");
               } 
               else {
                req.body.Email = user.Email;
                return this.settingsService
                  .findUserByEmail(user.Email)
                  .then((user) => {
                      if(!user) {
                        return res.status(404).json("There is no user found with this email address!");
                      }
                      else {
                        req.body.UserId = user.UserId;
                        req.body.IsDeleted = false;
                        return this.settingsService
                          .createUserAddress(req.body)
                          .then((address: UserAddress) => {
                            return res.status(200).json({ 
                                Address: req.body.AddressLine1 + ', ' + req.body.AddressLine2 + ', ' + req.body.City + ', ' + req.body.State + ', ' + req.body.PostalCode,
                                PhoneNumber: req.body.Mobile
                             });
                          })
                          .catch((error: Error) => {
                            return res.status(500).json({ error });
                          });
                      }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error });
                  });
               }
            });
        }
        else {
            return res.status(400).json("No token exists!");
        }
    };

    public getUserAddress = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        let userAddress: UserAddress[] = [];
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user:any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.settingsService
                      .findUserByEmail(user.Email)
                      .then((findUser) => {
                          if(!findUser) {
                            return res.status(404).json("There is no user found with this email address!");
                          }
                          else {
                              return this.settingsService
                                .findAddresByUserId(findUser.UserId)
                                .then((address) => {
                                    if(address.length > 0) {
                                        for(let a in address) {
                                            address[a].UserId = findUser.UserId;
                                            userAddress.push(address[a]);
                                        }
                                        if(userAddress.length > 0) {
                                            for(let a in address) {
                                                return res.status(200).json({ userAddress });
                                            }
                                        }
                                        else{
                                            return res.status(404).json("There is no address!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("User Address not found!");
                                    }
                                })
                                .catch((error: Error) => {
                                    return res.status(500).json({ error });
                                });
                          }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("No token exists!");
        }
    };

    public getAddressById = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.settingsService
                      .findUserByEmail(user.Email)
                      .then((user) => {
                          if(user && user.UserTypeId === 1) {
                              return this.settingsService
                                .findByAddressId(+req.params.AddressId)
                                .then((address) => {
                                    if(address) {
                                        if(user.UserId === address.UserId) {
                                            return res.status(200).json(address);
                                        }
                                        else {
                                            return res.status(404).json("Invalid User!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("No address found!");
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
            });
        }
        else {
            return res.status(404).json("No token exists!");
        }
    };

    public updateUserAddress = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    const { Email } = user;
                    if(Email) {
                        const AddressLine1 = req.body.AddressLine1;
                        const AddressLine2 = req.body.AddressLine2;
                        const City = req.body.City;
                        const State = req.body.State;
                        const PostalCode = req.body.PostalCode;
                        const Mobile = req.body.Mobile;
                        return this.settingsService
                          .findUserByEmail(Email)
                          .then((findUser) => {
                              if(findUser) {
                                  return this.settingsService
                                    .findByAddressId(+req.params.AddressId)
                                    .then((id) => {
                                        if(id) {
                                            if(findUser.Email === id.Email) {
                                                return this.settingsService
                                                .updateUserAddress( +req.params.AddressId, AddressLine1, AddressLine2, City, State, PostalCode, Mobile )
                                                .then((address) => {
                                                    return res.status(200).json({
                                                        Address: AddressLine1 + ', ' + AddressLine2 + ', ' + City + ', ' + State + ', ' + PostalCode,
                                                        PhoneNumber: Mobile
                                                    });
                                                })
                                                .catch((error: Error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                return res.status(404).json("Enter valid Id!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("Id not found!");
                                        }
                                    })
                                    .catch((error: Error) => {
                                        return res.status(500).json({ error: error });
                                    });
                              }
                              else {
                                  return res.status(404).json("No user found with this email!");
                              }
                          })
                          .catch((error: Error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(404).json("No email found!");
                    }
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };



    public deleteAddress = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.settingsService
                      .findUserByEmail(user.Email)
                      .then((findUser) => {
                          if(findUser) {
                              return this.settingsService
                                .findByAddressId(+req.params.AddressId)
                                .then((id) => {
                                    if(id) {
                                        if(findUser.Email === id.Email) {
                                            return this.settingsService
                                            .deleteAddress(+req.params.AddressId)
                                            .then((address) => {
                                              return res.status(200).json("Address deleted Successfully!");
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error : error });
                                            });
                                        }
                                        else {
                                            return res.status(404).json("Enter valid Id");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("Id not found!");
                                    }
                                })
                                .catch((error: Error) => {
                                    return res.status(500).json({ error : error });
                                });
                          }
                          else {
                            return res.status(404).json("No user found with this email!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error : error });
                    });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public changePassword = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.settingsService
                          .findUserByEmail(user.Email)
                          .then(async (findUser) => {
                              if(findUser && findUser.UserTypeId === 1) {
                                  const isOld = await bcrypt.compare(req.body.OldPassword, findUser.Password);
                                  if(!isOld) {
                                    return res.status(400).json("Incorrect Old Password!");
                                  }
                                  else {
                                    if(req.body.OldPassword === req.body.NewPassword) {
                                        return res.status(400).json("Choose different password other than older one!");
                                    }
                                    else {
                                        if(req.body.NewPassword !== req.body.ConfirmPassword) {
                                            return res.status(400).json("New Password & Confirm Password is not matching!");
                                        }
                                        else {
                                            req.body.NewPassword = await bcrypt.hash(req.body.NewPassword, saltRouds);
                                            return this.settingsService
                                              .changePassword(user.Email, req.body.NewPassword)
                                              .then(async (user) => {
                                                  return res.status(200).status(200).json("Password changed Successfully!");     
                                              })
                                              .catch((error: Error) => {
                                                  console.log(error);
                                                  return res.status(500).json({ error: error });
                                              });
                                        }
                                    }
                                  }
                              }
                              else {
                                  return res.status(404).json("User not exist!");
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
            return res.status(404).json("Token not exists!");
        }
    };

}