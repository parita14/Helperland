import { Request, Response } from "express";
import { User } from "../../models/user";
import { CustomerService } from "./customer.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mailgun from "mailgun-js";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

const saltRouds: number = 10;

export class CustomerController {
    public constructor(private readonly customerService: CustomerService) {
        this.customerService = customerService;
    }

    public createCustomer = async (req: Request, res: Response): Promise<Response | undefined> => {
        const doMatch = req.body.Password === req.body.ConfirmPassword;

        if(!req.body.Email) {
            return res.status(400).json("Please write all required fields!");        
        }

        else if(!req.body.Password) {
            return res.status(400).json("Please write all required fields!");        
        }

        return this.customerService
            .findCustomerByEmail(req.body.Email)
            .then(async (user: User | null) => {
              if(user) {
                return res.status(400).json("User exists, try Login instead or try with another email address!");
              }
              if(!doMatch) {
                return res.status(400).json("Password is not matching, please write correct password!");
              }
              req.body.Password = await bcrypt.hash(req.body.Password, saltRouds);
              const emailToken = this.customerService.generateToken(req.body.Email!);
              const activateLink = this.customerService.activateLink(req.body.Email!, emailToken);
              const mail = mg.messages().send(activateLink);
              if(!mail) {
                return res.status(400).json("Mail not sent!");
              }
              return this.customerService
                .createCustomer(req.body)
                .then((user: User) => {
                    return res.status(200).json("Registration Success, Please verify your account within 2 hours!");
                })
                .catch((error: Error) => {
                    return res.status(500).json({ error: error });
                });
            })
            .catch((error: Error) => {
                return res.status(500).json({ error: error });
            });
    };

    public activateCustomer = async (req: Request, res:Response): Promise<Response | undefined> => {
      const { token } = req.params;
      if (token) {
        jwt.verify(token,process.env.ACTIVATION_LINK!,(error, decodedToken: any) => {
            if (error) {
              return res.status(400).json("Invalid or Expired link!");
            }
            const { Email } = decodedToken;
            if (Email) {
              return this.customerService
                .findCustomerByEmail(Email)
                .then((customer) => {
                  if (customer) {
                    customer.IsRegisteredUser = true;
                    customer.IsActive = true;
                    return this.customerService
                      .activateCustomer(customer.IsRegisteredUser, customer.IsActive, customer.Email!)
                      .then((customer) => {
                        return res.status(200).json("Your account activated successfully!");
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({error});
                      });
                  }
                  return res.json( "Some error occurred!" );
                })
                .catch((error: Error) => {
                  return res.status(500).json({error});
                });
            }
            return res.json( "Some error occurred!" );
          }
        );
      } else {
        return res.json( "Some error occurred!" );
      }
  };

    public getUsers = async (req: Request, res: Response): Promise<Response> => {
        return this.customerService
          .getUsers()
          .then((user: User[]) => {
              return res.status(200).json({ user });
          })
          .catch((error: Error) => {
              return res.status(500).json({ error: error });
          });
    };

    public getUsersById = async (req: Request, res: Response): Promise<Response> => {
        return this.customerService
          .getUsersById(+req.params.UserId)
          .then((user) => {
            if(!user) {
                return res.status(404).json({ error: 'User not exist' });
            } 
            else{ 
                return res.status(200).json({ user });
            }
          })
          .catch((error: Error) => {
              return res.status(500).json({ error: error });
          });
    };
}