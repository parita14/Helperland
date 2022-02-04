import { User } from "../models/user";
import { LogInRepository } from "./login.repository";

export class LogInService {
    public constructor(private readonly loginRepository: LogInRepository) {
        this.loginRepository = loginRepository;
    }

    public async findUsersByEmail(Email: string): Promise<User | null> {
        return this.loginRepository.findUsersByEmail(Email);
    }

    public async logIn(user: User): Promise<User | null> {
        return this.loginRepository.logIn(user);
    }

    public async activateCustomer(IsRegisteredUser: boolean, IsActive: boolean, Email: string): Promise<[number, User[]]> {
        return this.loginRepository.activateCustomer(IsRegisteredUser, IsActive, Email);
    }

    public async forgotPassword(resetPasswordToken: string, resetPasswordExpires: Date, Email: string): Promise<[number, User[]]> {
        return this.loginRepository.forgotPassword(resetPasswordToken, resetPasswordExpires, Email);
    }

    public async resetPassword(Password: string, Email: string): Promise<[number, User[]]> {
        return this.loginRepository.resetPassword(Password, Email);
    }

}