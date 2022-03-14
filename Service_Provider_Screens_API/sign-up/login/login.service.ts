import { User } from "../../models/user";
import { LogInRepository } from "./login.repository";
import jwt from "jsonwebtoken";

export class LogInService {
    public constructor(private readonly loginRepository: LogInRepository) {
        this.loginRepository = loginRepository;
    }

    public async findUsersByEmail(Email: string): Promise<User | null> {
        return this.loginRepository.findUsersByEmail(Email);
    }

    public generateToken(Email: string): string {
        const token = jwt.sign({Email}, process.env.SECRET_KEY!, {expiresIn: '12h'});
        return token;
    }

}