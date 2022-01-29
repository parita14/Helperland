import { db } from "../models/index";
import { ContactUs } from "../models/contactus";

export class ContactsRepository {
    public async getContactsById(ContactUsId: number) : Promise<ContactUs | null> {
        return db.Contacts.findOne({ where: {ContactUsId: ContactUsId} });
    }

    public async getContacts(): Promise<ContactUs[]> {
        return db.Contacts.findAll();
    }

    public async createContacts(contact: ContactUs): Promise<ContactUs> {
        return db.Contacts.create(contact);
    }

}