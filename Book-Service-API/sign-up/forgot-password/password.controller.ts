import { Request, Response } from "express";
import { User } from "../../models/user";
import { PasswordService } from "./password.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mailgun from "mailgun-js";
require('dotenv').config();

const DOMAIN:string = process.env.DOMAIN!;
const mg = mailgun({apiKey: process.env.API_KEY!, domain:DOMAIN});

const saltRouds: number = 10;

export class PasswordController {
  public constructor(private readonly passwordService: PasswordService) {
    this.passwordService = passwordService;
  }

  public forgotPassword = async (req: Request, res: Response) : Promise<Response | undefined> => {
    const Email = req.body.Email;
    
    if(!Email) {
      return res.status(400).json("Please write all required fields!");
    }
    
    return this.passwordService
      .findUsersByEmail(Email)
      .then((user: User | null) => {
        if(!user) {
          return res.status(404).json("User is not exists with this email address!");
        }
            
        const resetToken = this.passwordService.generateToken(user.UserId);
        const resetLink = this.passwordService.resetLink(user.Email!, resetToken);
        const mail = mg.messages().send(resetLink);
        if(!mail) {
      return res.status(400).json("Email not sent!");
        }
        return res.status(200).json("An email has been sent to your account. Click on the link in received email to reset the password.");    
      })
      .catch((error: Error) => {
        return res.status(500).json({ error });
      });
  };
    
  public resetPassword = async (req: Request, res: Response) : Promise<Response | undefined> => {
    const resetToken: string = req.params.resetToken;
    
    if(!req.body.NewPassword) {
      return res.status(403).json("Please write all required fields!");
    }
    
    else if(!req.body.ConfirmPassword) {
      return res.status(403).json("Please write all required fields!");
    }

    if(resetToken) {
      jwt.verify(resetToken, process.env.FORGOT_PASSWORD!, (error, decodedToken: any) => {
        if(error) {
          return res.status(401).json("Invalid or expired link!");
        }
        const UserId: number = decodedToken.UserId;
        return this.passwordService
          .findUsersById(UserId)
          .then(async (user: User | null) => {
            if(!user) {
              return res.status(404).json("User is not exists with this id!");
            }
            const doMatch = await bcrypt.compare(req.body.NewPassword, user.Password!);
            if(doMatch) {
              return res.status(400).json("Please choose different password!");
            }
            else{
              if(req.body.NewPassword !== req.body.ConfirmPassword) {
                return res.status(400).json("Your password is not matching, Please write correct password!")
              }
              user.Password = await bcrypt.hash(req.body.NewPassword, saltRouds);
              return this.passwordService
                .resetPassword(user.Password, user.UserId)
                .then((user) => {
                  return res.status(200).json("Password updated successfully!");
                })
                .catch((error: Error) => {
                  return res.status(500).json({ error });
                });
            }
          })
          .catch((error: Error) => {
            return res.status(500).json({ error });
          });
      });
    }
    else {
      return res.status(400).json("Some error occurred!");
    }
  };
}