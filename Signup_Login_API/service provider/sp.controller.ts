import { Request, Response } from "express";
import { User } from "../models/user";
import { SPService } from "./sp.service";
import bcrypt from "bcryptjs";
import mailgun from "mailgun-js";

const DOMAIN:string = 'sandbox95ed9a33e16a4d37826b4d80df84cf49.mailgun.org';
const mg = mailgun({apiKey: 'f7729eb1e723a00d0e223afad8e00907-c250c684-90a175b4', domain:DOMAIN});

const saltRouds: number = 10;

export class SPController {
    public constructor(private readonly spService: SPService) {
        this.spService = spService;
    }

    public createSP = async (req: Request, res: Response): Promise<Response | undefined> => {
        const isSame = req.body.Password === req.body.ConfirmPassword;

            return this.spService
            .findSPByEmail(req.body.Email)
            .then(async (user: User | null) => {
                if(user) {
                    return res.status(401).json("User exists, try Login instead or try with another email address!");
                }
                if(!isSame) {
                    return res.status(401).json("Password is not matching, please write correct password!");
                }
                req.body.Password = await bcrypt.hash(req.body.Password, saltRouds);
                let code = Math.floor(100000 + Math.random() * 900000);
                let expiry = Date.now() + 60*1000*60;
  
                const sendCode = {
                  from: 'helperland@gmail.com',
                  to: req.body.Email,
                  subject: 'Verify your email',
                  html: `<!DOCTYPE>
                         <html>
                         <body>
                          <p>Your authentication code is: </p> 
                          <p>Click here to<a href="http://localhost:3000/activate/${code}"> Activate </a>your account</p>
                         </body>
                         </html>`
                };
  
                mg.messages().send(sendCode);
  
                req.body.emailToken = code;
                req.body.emailTokenExpires = new Date(expiry);
                
                return this.spService
                    .createSP(req.body)
                    .then((user: User) => {
                        return res.status(200).json("Registration Success, Please verify your account!");
                    })
                    .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                    });
            })
            .catch((error: Error) => {
                return res.status(500).json(error);
            });
    };

}