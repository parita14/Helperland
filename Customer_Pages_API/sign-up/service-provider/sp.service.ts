import { User } from "../../models/user";
import { SPRepository } from "./sp.repository";
import jwt from "jsonwebtoken";

export class SPService {
    public constructor(private readonly spRepository: SPRepository) {
        this.spRepository = spRepository;
    }

    public async createSP(user: User): Promise<User> {
        return this.spRepository.createSP(user);
    }

    public activateLink(Email: string, emailToken: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
                to: Email,
                subject: 'Verify Your Account',
                html: `<html>
                <body>
                <h2>Activate Your Account :</h2>
                <p>Please click here to <a href="http://localhost:3000/activate/service-provider/${emailToken}">activate</a> you account!</p>
                </body></html>`
        }
        return data;
    }

    public async activateHelper(IsRegisteredUser: boolean, IsActive: boolean, Email: string): Promise<[number, User[]]> {
        return this.spRepository.activateHelper(IsRegisteredUser, IsActive, Email);
    }

    public generateToken(Email: string): string {
        const emailToken = jwt.sign({Email}, process.env.ACTIVATION_LINK!, {expiresIn: '2h'});
        return emailToken;
    }
    
    public async findSPByEmail(Email: string): Promise<User | null> {
        return this.spRepository.findSPByEmail(Email);
    }

}