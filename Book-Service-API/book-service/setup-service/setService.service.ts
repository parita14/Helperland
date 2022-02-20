import { ServiceRepository } from "./setService.repository";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";

export class ServiceService {
    public constructor(private readonly serviceRepository : ServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public async getSP(): Promise<User[]> {
        return this.serviceRepository.getSP();
    }

    public generateToken(Email: string, ZipCode: string): string {
        const emailToken = jwt.sign({Email, ZipCode}, process.env.SECRET_KEY!, {expiresIn: '12h'});
        return emailToken;
    }
}