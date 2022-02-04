import { db } from "../models/index";
import { User } from "../models/user";

export class SPRepository {
    public async createSP(user: User): Promise<User> {
        const { FirstName, LastName, Email, Password, Mobile, IsRegisteredUser, IsActive, resetPasswordToken, resetPasswordExpires, emailToken, emailTokenExpires } = user;
        return db.Users.create({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
            Password: Password,
            Mobile: Mobile,
            UserTypeId: 2,
            IsRegisteredUser: IsRegisteredUser,
            IsApproved: true,
            IsActive: IsActive,
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpires: resetPasswordExpires,
            emailToken: emailToken,
            emailTokenExpires: emailTokenExpires
        });
    }

    public async findSPByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }
    
}