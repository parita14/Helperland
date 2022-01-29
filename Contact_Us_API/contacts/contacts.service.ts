import { ContactUs } from "../models/contactus";
import { ContactsRepository } from "./contacts.repository";

export class ContactsService {
    public constructor(private readonly contactsRepository: ContactsRepository) {
        this.contactsRepository = contactsRepository;
    }

    public async getContactsById(ContactUsId: number): Promise<ContactUs | null> {
        return this.contactsRepository.getContactsById(ContactUsId);
    }

    public async getContacts(): Promise<ContactUs[]> {
        return this.contactsRepository.getContacts();
    } 

    public async createContacts(contacts: ContactUs): Promise<ContactUs> {
        return this.contactsRepository.createContacts(contacts);
    }
}