import { db } from "../../models/index";
import { User } from "../../models/user";

export class CustomerRepository {

    public async createCustomer(user: User): Promise<User> {
        const { FirstName, LastName, Email, Password, Mobile,ZipCode } = user;
        return db.Users.create({ 
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: Password,
            Mobile: Mobile,
            UserTypeId: 1,
            IsRegisteredUser: false,
            ZipCode: ZipCode,
            IsApproved: false,
            IsActive: false,
            DateOfRegistration: Date.now()
        });
    }

    public async findCustomerByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async activateCustomer(IsRegisteredUser: boolean, IsActive: boolean, Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return db.Users.update({ IsRegisteredUser: IsRegisteredUser, IsActive: IsActive}, {where: {Email: Email}} );
    }

}