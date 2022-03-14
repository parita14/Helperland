import { Request, Response, NextFunction } from "express";
import { User } from "../../models/user";
import { LogInService } from "./login.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
require('dotenv').config();

export class LogInController {
    public constructor(private readonly loginService: LogInService) {
        this.loginService = loginService;
    }

    public  logIn = async (req: Request, res: Response): Promise<Response | void > => {
        const Email = req.body.Email;
        let Password = req.body.Password;
    
        if(!Email) {
          return res.status(400).json("Please write all required fields!");
        }

        else if(!Password) {
          return res.status(400).json("Please write all required fields!");
        }

        return this.loginService
          .findUsersByEmail(Email)
          .then((user: User | null | any) => {
              if(!user) {
                return res.status(404).json("Invalid Username or Password!");
              } 
              
              else if(user.IsRegisteredUser!==true) {
                return res.status(400).json("Please activate your account!");
              }

              else if(user.IsActive!==true) {
                return res.status(400).json("Please activate your account!");
              }
    
              else {
                bcrypt
                  .compare(Password, user.Password)
                  .then(async (doMatch: any) => {
                    if(doMatch) {
                      const token = this.loginService.generateToken(user.Email!);
                        
                      if(user?.UserTypeId === 1) {
                        return res
                          .status(200)
                          .cookie("token", token, { httpOnly: true, expires: new Date(Date.now()+600000) })
                          .json({ message: `Customer named ${user.FirstName} is Logged In Successfully`, token});
                      }
                      else if(user?.UserTypeId === 2) {
                        return res
                          .status(200)
                          .cookie("token", token, { httpOnly: true, expires: new Date(Date.now()+600000) })
                          .json({ message: `Service Provider named ${user.FirstName} is Logged In Successfully`, token});
                      }
                    }
                    else {
                        return res.status(400).json("Invalid Username or Password!");
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
    };

    public validateToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
      const token = req.headers.authorization || req.header('auth');
      if(token == null) {
        return res.status(401).json("Invalid login credentials!");
      }
      jwt.verify(token!, process.env.SECRET_KEY!, (error, decodedToken: any) => {
        if(error) {
          return res.status(400).json("Invalid login credentials!!");
        }
        const { Email } = decodedToken;
        if(Email){
          return this.loginService
            .findUsersByEmail(Email)
            .then((user) => {
              if(user === null) {
                return res.status(404).json("User not found!");
              }
              else {
                req.body.UserId = user.UserId;
                req.body.UserTypeId = user.UserTypeId;
                if(user.IsRegisteredUser === true) {
                  if(user.IsActive === true) {
                    next();
                  }
                  else {
                    return res.status(400).json("Please activate your account!");
                  }
                }
                else {
                  return res.status(400).json("Please activate your account!");
                }
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({ error });
            });
          }
          else {
            return res.json("Some error occurred!");
          }
      });
    };

    public logout = async (req: Request, res: Response): Promise<Response> => {
      try {
        res.clearCookie('token');
        return res.status(200).json("You Logged Out Successfully!");
      }
      catch(error) {
        return res.status(401).json("Log Out Process Failed!");
      }
    };

}