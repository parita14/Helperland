import { User } from "../../models/user";
import { PasswordRepository } from "../forgot-password/password.repository";
import jwt from "jsonwebtoken";

export class PasswordService {
    public constructor(private readonly passwordRepository: PasswordRepository) {
        this.passwordRepository = passwordRepository;
    }

    public async findUsersByEmail(Email: string): Promise<User | null> {
        return this.passwordRepository.findUsersByEmail(Email);
    }

    public async findUsersById(UserId: number): Promise<User | null> {
        return this.passwordRepository.findUsersById(UserId);
    }

    public resetLink(Email: string, resetToken: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
                to: Email,
                subject: 'Reset Your Password',
                html: `<html>
                <body>
                <h2>Reset Your Password :</h2>
                <p>Please click here to <a href="http://localhost:3000/reset-password/${resetToken}">Reset</a> your account password!</p>
                </body></html>`
        }
        return data;
    }

    public generateToken(UserId: number): string {
        const resetToken = jwt.sign({UserId}, process.env.FORGOT_PASSWORD!, {expiresIn: '2h'});
        return resetToken;
    }

    public async resetPassword(Password: string, UserId: number): Promise<[number, User[]]> {
        return this.passwordRepository.resetPassword(Password, UserId);
    }
}