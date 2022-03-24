import { db } from "../models/index";
import { ContactUs } from "../models/contactus";
import { User } from "../models/user";

export class ContactsRepository {
    public async createContacts(contacts: ContactUs): Promise<ContactUs> {
        return db.Contacts.create(contacts);
    }

    public async getContactsById(ContactUsId: number) : Promise<ContactUs | null> {
        return db.Contacts.findOne({ where: {ContactUsId: ContactUsId} });
    }

    public async getContacts(): Promise<ContactUs[]> {
        return db.Contacts.findAll();
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }
}