import { User } from "../../models/user";
import { CustomerRepository } from "./customer.repository";
import jwt from "jsonwebtoken";

export class CustomerService {
    public constructor(private readonly customerRepository: CustomerRepository) {
        this.customerRepository = customerRepository;
    }

    public async createCustomer(user: User): Promise<User> {
        return this.customerRepository.createCustomer(user);
    }

    public activateLink(Email: string, emailToken: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
                to: Email,
                subject: 'Verify Your Account',
                html: `<html>
                  <body>
                  <h2>Activate Your Account :</h2>
                  <p>Please click here to <a href="http://localhost:3000/activate/customer/${emailToken}">activate</a> you account!</p>
                  </body></html>`
        }
        return data;
    }

    public generateToken(Email: string): string {
        const emailToken = jwt.sign({Email}, process.env.ACTIVATION_LINK!, {expiresIn: '2h'});
        return emailToken;
    }

    public async activateCustomer(IsRegisteredUser: boolean, IsActive: boolean, Email: string): Promise<[number, User[]]> {
        return this.customerRepository.activateCustomer(IsRegisteredUser, IsActive, Email);
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