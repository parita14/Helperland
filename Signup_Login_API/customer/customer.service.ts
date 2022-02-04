import { User } from "../models/user";
import { CustomerRepository } from "./customer.repository";

export class CustomerService {
    public constructor(private readonly customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }

    public async createCustomer(user: User): Promise<User> {
        return this.customerRepository.createCustomer(user);
    }

    public async findCustomerByEmail(Email: string): Promise<User | null> {
        return this.customerRepository.findCustomerByEmail(Email);
    }

    public async getUsersById(UserId: number): Promise<User | null> {
        return this.customerRepository.getUsersById(UserId);
    }

    public async getUsers(): Promise<User[]> {
        return this.customerRepository.getUsers();
    }

}