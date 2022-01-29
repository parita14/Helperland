import { Request, Response } from 'express';
import { ContactUs } from "../models/contactus";
import { ContactsService } from "./contacts.service";

export class ContactsController {
    public constructor(private readonly contactsService: ContactsService) {
        this.contactsService = contactsService;
    }

    public getContacts = async (req: Request, res: Response): Promise<Response> => {
        return this.contactsService
          .getContacts()
          .then((contacts: ContactUs[]) => {
              return res.status(200).json({ contacts });
          })
          .catch((error: Error) => {
              return res.status(500).json({
                  error: error
              });
          });
    };

    public createContacts = async (req: Request, res: Response): Promise<Response> => {
        return this.contactsService
          .createContacts(req.body)
          .then((contacts: ContactUs) => {
              return res.status(200).json({ contacts });
          })
          .catch((error: Error) => {
              return res.status(500).json({
                  error: error
              });
          });
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
              return res.status(500).json({
                error: error
              });
          });
    };
}
