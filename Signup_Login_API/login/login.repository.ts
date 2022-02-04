import { db } from "../models/index";
import { User } from "../models/user";

export class LogInRepository {

    public async findUsersByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async logIn(user: User): Promise<User | null> {
        const { Email, Password } = user;
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async activateCustomer(IsRegisteredUser: boolean, IsActive: boolean, Email: string): Promise<[number, User[]]> {
        return db.Users.update({ IsRegisteredUser: IsRegisteredUser, IsActive: IsActive}, {where: {Email: Email}} );
    }

    public async forgotPassword(resetPasswordToken: string, resetPasswordExpires: Date, Email: string): Promise<[number, User[]]> {
        return db.Users.update({resetPasswordToken: resetPasswordToken, resetPasswordExpires: resetPasswordExpires}, {where: {Email: Email}});
    }

    public async resetPassword(Password: string, Email: string): Promise<[number, User[]]> {
        return db.Users.update({ Password: Password }, {where: {Email: Email}});
    }

}