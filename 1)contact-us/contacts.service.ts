import { ContactUs } from "../models/contactus";
import { User } from "../models/user";
import { ContactsRepository } from "./contacts.repository";

export class ContactsService {
    public constructor(private readonly contactsRepository: ContactsRepository) {
        this.contactsRepository = contactsRepository;
    }

    public async createContacts(contacts: ContactUs): Promise<ContactUs> {
        return this.contactsRepository.createContacts(contacts);
    }

    public async getContactsById(ContactUsId: number): Promise<ContactUs | null> {
        return this.contactsRepository.getContactsById(ContactUsId);
    }

    public async getContacts(): Promise<ContactUs[]> {
        return this.contactsRepository.getContacts();
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.contactsRepository.findUserByEmail(Email);
    }

    public async findAdmin(): Promise<User[]> {
        return this.contactsRepository.findAdmin();
    }

    public SendAdmin(Email: string, Name: string, UserEmail: string, Subject: string, Mobile: string, Message: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
                to: Email,
                subject: 'New User Contacted',
                html: `<html>
                  <body>
                  <h4>Details :</h4>
                  <p>UserName: ${Name}</p>
                  <p>UserEmail: ${UserEmail}</p>
                  <p>Subject: ${Subject}</p>
                  <p>PhoneNumber: ${Mobile}</p>
                  <p>Message: ${Message}</p>
                  </body></html>`
        }
        return data;
    }
}