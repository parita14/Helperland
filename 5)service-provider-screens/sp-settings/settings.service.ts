import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { SettingsRepository } from "./settings.repository";


export class SettingsService {
    public constructor(private readonly settingsRepository: SettingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.settingsRepository.findUserByEmail(Email);
    }

    public async changePassword(Email: string, Password: string): Promise<[number, User[]] | [affectedCount: number]> {
        return this.settingsRepository.changePassword(Email, Password);
    }

    public async updateSPDetails( Email: string, FirstName: string, LastName: string, Mobile: string, DateOfBirth: Date, NationalityId: number, Gender: number, UserProfilePicture: number, ZipCode: number ): Promise<[number, User[]] | [affectedCount: number]> {
        return this.settingsRepository.updateSPDetails(Email, FirstName, LastName, Mobile, DateOfBirth, NationalityId, Gender, UserProfilePicture, ZipCode);
    }

    public async findByUserId(UserId: number): Promise<UserAddress | null> {
        return this.settingsRepository.findByUserId(UserId);
    }

    public async createUserAddress(address: UserAddress): Promise<UserAddress> {
        return this.settingsRepository.createUserAddress(address);
    }

    public async updateUserAddress(UserId: number, AddressLine1: string, AddressLine2: string, City: string, PostalCode: number, Mobile: number): Promise<[number, UserAddress[]] | [affectedCount: number]> {
        return this.settingsRepository.updateUserAddress(UserId, AddressLine1, AddressLine2, City, PostalCode, Mobile);
    }
}