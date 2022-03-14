import { Request, Response } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { ServiceService } from "./setService.service";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class ServiceController {
    public constructor(private readonly serviceService: ServiceService) {
        this.serviceService = serviceService;
    }

    public setService = async (req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization || req.header('auth')
        const ZipCode = req.body.ZipCode;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.serviceService
                      .findUser(user.Email, req.body.ZipCode)
                      .then((user) => {
                          if(user) {
                            if(!ZipCode) {
                                return res.status(403).json("Couldn't process request. Please provide all mandatory fields!");
                            }
                            else {
                                return this.serviceService
                                  .getSP()
                                  .then((sp) => {
                                      let doMatch;
                                      if(!sp) {
                                        return res.status(404).json("There is no helper found!");
                                      }
                                      else {
                                        for(let zc in sp) {
                                            if(sp[zc].ZipCode === req.body.ZipCode){
                                                doMatch =true;
                                            }
                                        }
                                        if(!doMatch) {
                                          return res.status(404).json("We are not providing service in this area. We will notify you if any helper would start working near your area.");
                                        }
                                        else {
                                          jwt.verify(token, process.env.SECRET_KEY!, (err, helper:any) => {
                                              if(err) {
                                                  return res.status(400).json("Invalid or expired token!");
                                              }
                                              else{
                                                  const Email = helper.Email;
                                                  const ZipCode = req.body.ZipCode;
                                                  const token = this.serviceService.generateToken(Email, ZipCode);
                                                  return res.status(200).cookie("token", token, {httpOnly: true}).json({ message: "Helper found!", token});
                                              }
                                          }); 
                                        }
                                      }
                                    })
                                    .catch((error: Error) => {
                                        return res.status(500).json({ error });
                                    });
                            }
                          }
                          else {
                              return res.status(404).json("Email not found or write correct ZipCode!");
                          }
                    })
                      .catch((error: Error) => {
                        return res.status(500).json({ error });
                    });
                }
            });
        }
        else {
            return res.status(404).json("Token not exists!");
        }
    };
}