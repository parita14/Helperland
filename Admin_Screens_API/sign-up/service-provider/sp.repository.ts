import { db } from "../../models/index";
import { User } from "../../models/user";

export class SPRepository {
    public async createSP(user: User): Promise<User> {
        const { FirstName, LastName, Email, Password, Mobile, IsRegisteredUser, ZipCode, IsActive } = user;
        return db.Users.create({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: Password,
            Mobile: Mobile,
            UserTypeId: 2,
            IsRegisteredUser: false,
            ZipCode: ZipCode,
            IsApproved: false,
            IsActive: false,
            DateOfRegistration: Date.now()
        });
    }

    public async findSPByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }
    
    public async activateHelper(IsRegisteredUser: boolean, IsActive: boolean, Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return db.Users.update({ IsRegisteredUser: IsRegisteredUser, IsActive: IsActive}, {where: {Email: Email}} );
    }

}