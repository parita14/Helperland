import { Request, Response } from "express";
import { User } from "../../models/user";
import { SPService } from "./sp.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mailgun from "mailgun-js";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

const saltRouds: number = 10;

export class SPController {
    public constructor(private readonly spService: SPService) {
        this.spService = spService;
    }

    public createSP = async (req: Request, res: Response): Promise<Response | undefined> => {
        const isSame = req.body.Password === req.body.ConfirmPassword;

        if(!req.body.Email) {
            return res.status(400).json("Please write all required fields!");        
        }

        if(!req.body.Password) {
            return res.status(400).json("Please write all required fields!");        
        }

        return this.spService
            .findSPByEmail(req.body.Email)
            .then(async (user: User | null) => {
                if(user) {
                    return res.status(400).json("User exists, try Login instead or try with another email address!");
                }
                if(!isSame) {
                    return res.status(400).json("Password is not matching, please write correct password!");
                }
                req.body.Password = await bcrypt.hash(req.body.Password, saltRouds);
                const emailToken = this.spService.generateToken(req.body.Email!);
                const activateLink = this.spService.activateLink(req.body.Email!, emailToken);
                const mail = mg.messages().send(activateLink);
                if(!mail) {
                  return res.status(400).json("Mail not sent!");
                }
                return this.spService
                    .createSP(req.body)
                    .then((user: User) => {
                        return res.status(200).json("Registration Success, Please verify your account within 2 hours!");
                    })
                    .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                    });
            })
            .catch((error: Error) => {
                return res.status(500).json(error);
            });
    };

    public activateHelper = async (req: Request, res:Response): Promise<Response | undefined> => {
      const { token } = req.params;
      if (token) {
        jwt.verify(token,process.env.ACTIVATION_LINK!,(error, decodedToken: any) => {
            if (error) {
              return res.status(400).json("Invalid or Expired link!");
            }
            const { Email } = decodedToken;
            if (Email) {
              return this.spService
                .findSPByEmail(Email)
                .then((helper) => {
                  if (helper) {
                    helper.IsRegisteredUser = true;
                    helper.IsActive = true;
                    return this.spService
                      .activateHelper(helper.IsRegisteredUser, helper.IsActive, helper.Email!)
                      .then((helper) => {
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

}