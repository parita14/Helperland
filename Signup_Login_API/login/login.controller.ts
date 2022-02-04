import { Request, Response } from "express";
import { User } from "../models/user";
import { LogInService } from "./login.service";
import bcrypt from "bcryptjs";
import mailgun from "mailgun-js";

const DOMAIN:string = 'sandbox95ed9a33e16a4d37826b4d80df84cf49.mailgun.org';
const mg = mailgun({apiKey: 'f7729eb1e723a00d0e223afad8e00907-c250c684-90a175b4', domain:DOMAIN});

const saltRouds: number = 10;

export class LogInController {
    public constructor(private readonly loginService: LogInService) {
        this.loginService = loginService;
    }

    public  logIn = async (req: Request, res: Response): Promise<Response | void > => {
        const Email = req.body.Email;
        let Password = req.body.Password;
    
        return this.loginService
          .findUsersByEmail(Email)
          .then((user: User | null | any) => {
              if(!user) {
                return res.status(404).json("User not exist, Please Sign Up first!");
              } 
              
              if(user.IsRegisteredUser!==true) {
                return res.status(404).json("User is not registered, activate your account!");
              }

              if (user.IsApproved!==true) {
                return res.status(404).json("User is not approved!");
              } 
    
              if (user.IsActive!==true) {
                return res.status(404).json("User is not active, You must verify your email to activate your account");
              }
    
              else {
                bcrypt
                  .compare(Password, user.Password)
                  .then(async (doMatch: any) => {
                    if(doMatch) {
                        return this.loginService
                        .logIn(req.body)
                        .then((user: User | null) => {
                            if(user?.UserTypeId === 1) {
                                res.status(200).json( `Customer named ${user.FirstName} is Logged In Successfully` );
                            }
                            else if(user?.UserTypeId === 2) {
                                res.status(200).json( `Service Provider named ${user.FirstName} is Logged In Successfully` );
                            }
                        })
                        .catch((error: Error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(404).json("Password is not matching, Please write correct password!");
                    }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });
              }   
          })
          .catch((error: Error) => {
            return res.status(500).json({ error: error });
          });
    };

    public activateCustomer = async (req: Request, res: Response): Promise<Response | void> => {
        const Email = req.body.Email;
        const token = req.params.token;

        return this.loginService
          .findUsersByEmail(Email)
          .then((user: User | null) => {
            if(!user) {
              return res.status(404).json("User is not registered or token expired!");
            }

            if(user.IsActive == true) {
              return res.json("User is already activated!");
            }

            if(user) {
                if(token !== user?.emailToken) {
                    return res.status(404).json("Your activation link is incorrect!");
                } 
                else {
                  user.IsRegisteredUser = true;
                  user.IsActive = true;
                  return this.loginService
                    .activateCustomer(user.IsRegisteredUser, user.IsActive, user.Email!)
                    .then((user) => {
                      return res.status(200).json(" Your Account activated Successfully");
                    })
                    .catch((error: Error) => {
                      return res.status(500).json({ error: error });
                    });
                } 
            } 
          })
          .catch((error: Error) => {
              return res.status(500).json({ error: error });
          });
          
    };

    public forgotPassword = async (req: Request, res: Response) : Promise<Response | undefined> => {
      const Email = req.body.Email;

      return this.loginService
        .findUsersByEmail(Email)
        .then((user: User | null) => {
          if(!user) {
            return res.status(404).json("User is not exists with this email address!");
          }
          let code = Math.floor(100000 + Math.random() * 900000);
          let expiry = Date.now() + 60*1000*60;

          const sendCode = {
            from: 'helperland@gmail.com',
            to: req.body.Email,
            subject: 'Reset Password',
            html: `<!DOCTYPE>
                   <html>
                   <body>
                   <p>Your reset password link is: </p> 
                   <p>Click here to<a href="http://localhost:3000/reset-password/${code}"> Reset </a>your account password</p>
                   </body>
                   </html>`
          };

          mg.messages().send(sendCode);

          req.body.resetPasswordToken = code;
          req.body.resetPasswordExpires = new Date(expiry);

          return this.loginService
           .forgotPassword(req.body.resetPasswordToken, req.body.resetPasswordExpires, user.Email)
           .then((user) => {
            return res.status(200).json("An email has been sent to your account. Click on the link in received email to reset the password.");
           })
           .catch((error: Error) => {
             return res.status(500).json({ error });
           });          
        })
        .catch((error: Error) => {
          return res.status(500).json({ error });
        });
    };
 
    public resetPassword = async (req: Request, res: Response) : Promise<Response | undefined> => {
      const Email = req.body.Email;
      const NewPassword = req.body.NewPassword;
      const ConfirmPassword = req.body.ConfirmPassword;
      const resetPasswordToken = req.params.token;

      if(!Email || !NewPassword || !ConfirmPassword) {
        return res.status(403).json("Couldn't process request. Please provide all mandatory fields!");
      }

      return this.loginService
        .findUsersByEmail(Email)
        .then(async (user: User | null) => {
          if(!user) {
            return res.status(404).json("User is not exists with this email address!");
          }

          if(resetPasswordToken !== user.resetPasswordToken) {
            return res.status(404).json("Your reset password link is incorrect!");
          } 
          else {
            if(NewPassword !== ConfirmPassword) {
              return res.status(401).json("Password is not matching, please write correct password!");
            }
    
            const hash = await bcrypt.hash(NewPassword, saltRouds);
                  
            user.Password = hash;
    
            return this.loginService
              .resetPassword(user.Password, user.Email)
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
    };
}