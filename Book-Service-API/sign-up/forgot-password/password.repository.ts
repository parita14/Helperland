import { db } from "../../models/index";
import { User } from "../../models/user";

export class PasswordRepository {
    
    public async findUsersByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async findUsersById(UserId: number): Promise<User | null> {
        return db.Users.findOne({ where: {UserId: UserId} });
    }
    
    public async resetPassword(Password: string, UserId: number): Promise<[number, User[]]> {
        return db.Users.update({ Password: Password }, {where: {UserId: UserId}});
    }
}

