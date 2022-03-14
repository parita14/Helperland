import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class SettingsRepository {
    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async changePassword(Email: string, Password: string): Promise<[number, User[]]> {
        return db.Users.update({ Password: Password }, {where: { Email: Email }});
    }

    public async updateSPDetails( Email: string, FirstName: string, LastName: string, Mobile: string, DateOfBirth: Date, NationalityId: number, Gender: number, UserProfilePicture: number ): Promise<[number, User[]]> {
        return db.Users.update({ FirstName: FirstName, LastName: LastName, Mobile: Mobile, DateOfBirth: DateOfBirth, NationalityId: NationalityId, Gender: Gender, UserProfilePicture: UserProfilePicture }, { where: { Email: Email } });
    }

    public async findByUserId(UserId: number): Promise<UserAddress | null> {
        return db.UserAddress.findOne({ where: { UserId: UserId } });
    }

    public async createUserAddress(address: {[key: number | string] : UserAddress}): Promise<UserAddress> {
        return db.UserAddress.create(address);
    }

    public async updateUserAddress(UserId: number, AddressLine1: string, AddressLine2: string, City: string, PostalCode: number, Mobile: number): Promise<[number, UserAddress[]]> {
        return db.UserAddress.update({ AddressLine1: AddressLine1, AddressLine2: AddressLine2, City: City,  PostalCode: PostalCode, Mobile: Mobile }, { where: { UserId: UserId } });
    }
}