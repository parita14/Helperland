import { Request, Response, NextFunction } from "express";
import { ContactUs } from "../models/contactus";
import { ContactsService } from "./contacts.service";
import jwt from "jsonwebtoken";
require("dotenv").config();

export class ContactsController {
    public constructor(private readonly contactsService: ContactsService) {
        this.contactsService = contactsService;
    }

    public createContacts =async (req: Request, res: Response): Promise<Response> => {
        const FirstName: string = req.body.FirstName;
        const LastName: string = req.body.LastName;
        const Name: string = FirstName + " " + LastName;
        req.body.Name = Name;
        req.body.UploadFileName = req.file?.originalname;
        req.body.Path = req.file?.path;

        return this.contactsService
          .createContacts(req.body)
          .then((contacts) => {
              return res.status(200).json({ contacts });
          })
          .catch((error: Error) => {
              return res.status(500).json({ error: error });
          })
    };

    public getContactsById = async (req: Request, res: Response): Promise<Response> => {
        return this.contactsService
          .getContactsById(+req.params.ContactUsId)
          .then((contacts) => {
              if (contacts) {
                  return res.status(200).json({ contacts });
              }
              return res.status(404).json({ error: 'Not Found' });
          })
          .catch((error: Error) => {
              return res.status(500).json({ error: error });
          });
    };

    public getContacts = async (req: Request, res: Response): Promise<Response> => {
        return this.contactsService
          .getContacts()
          .then((contacts: ContactUs[]) => {
              return res.status(200).json({ contacts });
          })
          .catch((error: Error) => {
              return res.status(500).json({ error: error });
          });
    };

    public validate =async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        const token = req.headers.authorization! || req.header('auth');
        return this.contactsService
          .findUserByEmail(req.body.Email)
          .then((user) => {
              if(user) {
                  if(token) {
                      jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                        if(error) {
                            return res.status(400).json("Invalid login!");
                        }
                        else {
                            return this.contactsService
                              .findUserByEmail(user.Email)
                              .then((user) => {
                                  if(user) {
                                    req.body.CreatedBy = user.UserId;
                                    next();
                                  }
                                  else {
                                    return res.status(404).json("User is not exists!");
                                  }
                              })
                              .catch((error: Error) => {
                                  return res.status(500).json({ error: error });
                              });
                        }
                      });
                  }
                  else {
                      return res.status(400).json("You are not registered!");
                  }
              }
              else {
                  next();
              }
          })
          .catch((error: Error) => {
            return res.status(500).json({ error: error });
          });
    };
}