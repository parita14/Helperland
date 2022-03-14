import { Request, Response, NextFunction } from "express";
import { SettingsService } from "./settings.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

require('dotenv').config();
const saltRouds: number = 10;

export class SettingsController {
    public constructor(private readonly settingsService: SettingsService) {
        this.settingsService = settingsService;
    }

    public getSpDetails = async (req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.settingsService
                      .findUserByEmail(user.Email)
                      .then((findUser) => {
                          if(findUser && findUser.UserTypeId === 2) {
                              return this.settingsService
                                .findByUserId(findUser.UserId)
                                .then((address) => {
                                    if(address) {
                                        return res.status(200).json({
                                            AccountStatus: findUser.IsActive,
                                            FirstName: findUser.FirstName, 
                                            LastName: findUser.LastName,
                                            Email: findUser.Email,
                                            Mobile: findUser.Mobile,
                                            DateOfBirth: findUser.DateOfBirth,
                                            NationalityId: findUser.NationalityId,
                                            Gender: findUser.Gender,
                                            UserProfilePicture: findUser.UserProfilePicture,
                                            StreetName: address.AddressLine1,
                                            HouseNumber: address.AddressLine2,
                                            PostalCode: address.PostalCode,
                                            City: address.City
                                        });
                                    }
                                    else {
                                        return res.status(200).json({
                                            AccountStatus: findUser.IsActive,
                                            FirstName: findUser.FirstName, 
                                            LastName: findUser.LastName,
                                            Email: findUser.Email,
                                            Mobile: findUser.Mobile,
                                            DateOfBirth: findUser.DateOfBirth,
                                            NationalityId: findUser.NationalityId,
                                            Gender: findUser.Gender,
                                            UserProfilePicture: findUser.UserProfilePicture
                                        });
                                    }
                                })
                                .catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                  });
                          }
                          else {
                              return res.status(404).json("SP not exists!");
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

    public updateSPDetails = async (req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user:any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    const {Email} = user;
                    if(Email) {
                        return this.settingsService
                          .findUserByEmail(Email)
                          .then((findUser) => {
                            if(findUser) {
                                const FirstName = req.body.FirstName;
                                const LastName= req.body.LastName;
                                const Mobile= req.body.Mobile;
                                const DateOfBirth= req.body.DateOfBirth;
                                const NationalityId= req.body.NationalityId;
                                const Gender= req.body.Gender;
                                const UserProfilePicture= req.body.UserProfilePicture;
                                return this.settingsService
                                  .updateSPDetails( findUser.Email, req.body.FirstName, req.body.LastName, req.body.Mobile, req.body.DateOfBirth, req.body.NationalityId, req.body.Gender, req.body.UserProfilePicture )
                                  .then((user) => {
                                      return this.settingsService
                                        .findByUserId(findUser.UserId)
                                        .then((address) => {
                                            if(address) {
                                                const StreetName = req.body.AddressLine1;
                                                const HouseNumber = req.body.AddressLine2;
                                                const PostalCode = req.body.PostalCode;
                                                const City = req.body.City;
                                                return this.settingsService
                                                .updateUserAddress( findUser.UserId, req.body.AddressLine1, req.body.AddressLine2, req.body.City, req.body.PostalCode, req.body.Mobile)
                                                .then((address) => {
                                                    if(address) {
                                                        return res.status(200).json({
                                                            AccountStatus: findUser.IsActive,
                                                            FirstName: FirstName, 
                                                            LastName: LastName,
                                                            Email: findUser.Email,
                                                            Mobile: Mobile,
                                                            DateOfBirth: DateOfBirth,
                                                            NationalityId: NationalityId,
                                                            Gender: Gender,
                                                            UserProfilePicture: UserProfilePicture,
                                                            StreetName: StreetName,
                                                            HouseNumber: HouseNumber,
                                                            PostalCode: PostalCode,
                                                            City: City
                                                        });
                                                    }
                                                    else {
                                                        return res.status(400).json("Failure in updating address!");
                                                    }
                                                })
                                                .catch((error: Error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                if(!(req.body.AddressLine1, req.body.AddressLine2, req.body.PostalCode, req.body.City)) {
                                                    return res.status(400).json("Provide addres Details!");
                                                }
                                                req.body.UserId = findUser.UserId;
                                                req.body.Email = findUser.Email;
                                                req.body.IsDeleted = false;
                                                return this.settingsService
                                                  .createUserAddress(req.body)
                                                  .then((address) => {
                                                      if(address) {
                                                        const StreetName = req.body.AddressLine1;
                                                        const HouseNumber = req.body.AddressLine2;
                                                        const PostalCode = req.body.PostalCode;
                                                        const City = req.body.City;
                                                        return res.status(200).json({
                                                            AccountStatus: findUser.IsActive,
                                                            FirstName: FirstName, 
                                                            LastName: LastName,
                                                            Email: findUser.Email,
                                                            Mobile: Mobile,
                                                            DateOfBirth: DateOfBirth,
                                                            NationalityId: NationalityId,
                                                            Gender: Gender,
                                                            UserProfilePicture: UserProfilePicture,
                                                            StreetName: StreetName,
                                                            HouseNumber: HouseNumber,
                                                            PostalCode: PostalCode,
                                                            City: City
                                                        });
                                                      }
                                                      else {
                                                          return res.status(400).json("Failure in updating address!");
                                                      }
                                                  })
                                                  .catch((error: Error) => {
                                                    return res.status(500).json({ error });
                                                  });
                                            }
                                        })
                                        .catch((error: Error) => {
                                            return res.status(500).json({ error: error });
                                        });
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
                            }
                            else {
                                return res.status(404).json("No SP found with this email!");
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

    public changePassword = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth');

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.settingsService
                      .findUserByEmail(user.Email)
                      .then(async (user) => {
                          if(user && user.UserTypeId === 2) {
                            const isOld = await bcrypt.compare(req.body.OldPassword, user.Password);
                            if(!isOld) {
                                return res.status(400).json("Incorrect Old Password!");
                            }
                            else {
                                if(req.body.NewPassword !== req.body.ConfirmPassword) {
                                    return res.status(400).json("New Password & Confirm Password is not matching!");
                                }
                                    else {
                                    req.body.NewPassword = await bcrypt.hash(req.body.NewPassword, saltRouds);
                                    return this.settingsService
                                        .changePassword(user.Email, req.body.NewPassword)
                                        .then((password) => {
                                            return res.status(200).json("Password changed Successfully!");
                                        })
                                        .catch((error: Error) => {
                                        console.log(error);
                                        return res.status(500).json({ error: error });
                                    });
                                }
                            }
                          }
                          else {
                              return res.status(404).json("SP not found!");
                          }
                      })
                      .catch((error: Error) => {
                          return res.status(500).json(error);
                      });
                }
            });
        }
        else {
            return res.status(404).json("Token not exists!");
        }
    };
}

