import { User } from "../../models/user";
import { SettingsRepository } from "./settings.repository";
import { UserAddress } from "../../models/useraddress";

export class SettingsService {
    public constructor(private readonly settingsRepository: SettingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    public async updateUserDetails( Email: string, FirstName: string, LastName: string, Mobile: string, DateOfBirth: Date, LanguageId: number ): Promise<[number, User[]] | [affectedCount: number]> {
        return this.settingsRepository.updateUserDetails(Email, FirstName, LastName, Mobile, DateOfBirth, LanguageId);
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.settingsRepository.findUserByEmail(Email);
    }

    public async createUserAddress(address: UserAddress): Promise<UserAddress> {
        return this.settingsRepository.createUserAddress(address);
    }

    public async findAddresByUserId(UserId: number): Promise<UserAddress[]> {
        return this.settingsRepository.findAddresByUserId(UserId);
    }

    public async updateUserAddress(AddressId: number, AddressLine1: string, AddressLine2: string, City: string, State: string, PostalCode: number, Mobile: number): Promise<[number, UserAddress[]] | [affectedCount: number]> {
        return this.settingsRepository.updateUserAddress(AddressId, AddressLine1, AddressLine2, City, State, PostalCode, Mobile);
    }

    public async findByAddressId(AddressId: number): Promise<UserAddress | null> {
        return this.settingsRepository.findByAddressId(AddressId);
    }

    public deleteAddress(AddressId: number) {
        return this.settingsRepository.deleteAddress(AddressId);
    }

    public async changePassword(Email: string, Password: string): Promise<[number, User[]] | [affectedCount: number]> {
        return this.settingsRepository.changePassword(Email, Password);
    }
}