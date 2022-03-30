import { Op } from "sequelize";
import { db } from "../../models/index";
import { User } from "../../models/user";

export class UserRepository {

    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: { Email: Email } });
    }

    public async findAllUsers(): Promise<User[]> {
        return db.Users.findAll({ where: { UserTypeId: { [Op.or]: [1, 2] } } });
    }

    public async activateUser(Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return db.Users.update({ IsApproved: true }, { where: { Email: Email } } );
    }

    public async deactivateUser(Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return db.Users.update({ IsApproved: false }, { where: { Email: Email } } );
    }

}