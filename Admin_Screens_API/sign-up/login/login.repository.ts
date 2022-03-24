import { db } from "../../models/index";
import { User } from "../../models/user";

export class LogInRepository {

    public async findUsersByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

}