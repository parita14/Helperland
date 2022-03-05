import { ContactUs } from "../models/contactus";
import { User } from "../models/user";
import { ContactsRepository } from "./contacts.repository";

export class ContactsService {
    public constructor(private readonly contactsRepository: ContactsRepository) {
        this.contactsRepository = contactsRepository;
    }

    public async createContacts(contacts: {[key: number | string] : ContactUs}): Promise<ContactUs> {
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
}