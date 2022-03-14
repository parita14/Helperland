import { db } from "../../models/index";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class SettingsRepository {
    public async updateUserDetails( Email: string, FirstName: string, LastName: string, Mobile: string, DateOfBirth: Date, LanguageId: number ): Promise<[number, User[]]> {
        return db.Users.update({ FirstName: FirstName, LastName: LastName, Mobile: Mobile, DateOfBirth: DateOfBirth, LanguageId: LanguageId }, { where: { Email: Email } });
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async createUserAddress(address: {[key: number | string] : UserAddress}): Promise<UserAddress> {
        return db.UserAddress.create(address);
    }

    public async findAddresByUserId(UserId: number): Promise<UserAddress[]> {
        return db.UserAddress.findAll({ where: { UserId: UserId, IsDeleted: false } });
    }

    public async updateUserAddress(AddressId: number, AddressLine1: string, AddressLine2: string, City: string, State: string, PostalCode: number, Mobile: number): Promise<[number, UserAddress[]]> {
        return db.UserAddress.update({ AddressLine1: AddressLine1, AddressLine2: AddressLine2, City: City, State: State, PostalCode: PostalCode, Mobile: Mobile }, { where: { AddressId: AddressId } });
    }

    public async findByAddressId(AddressId: number): Promise<UserAddress | null> {
        return db.UserAddress.findOne({ where: { AddressId: AddressId, IsDeleted: false } });
    }

    public deleteAddress(AddressId: number) {
        return db.UserAddress.update({ IsDeleted: true }, { where: { AddressId: AddressId} });
    }

    public async changePassword(Email: string, Password: string): Promise<[number, User[]]> {
        return db.Users.update({ Password: Password }, {where: { Email: Email }});
    }
}