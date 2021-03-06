import { db } from "../../models/index";
import { User } from "../../models/user";

export class ServiceRepository {
    
    public async getSP(): Promise<User[]> {
        return db.Users.findAll({ where: {UserTypeId: 2} });
    }

    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: { Email: Email } });
    }
}