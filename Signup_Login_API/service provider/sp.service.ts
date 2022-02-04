import { User } from "../models/user";
import { SPRepository } from "./sp.repository";

export class SPService {
    public constructor(private readonly spRepository: SPRepository) {
        this.spRepository = spRepository;
    }

    public async createSP(user: User): Promise<User> {
        return this.spRepository.createSP(user);
    }

    public async findSPByEmail(Email: string): Promise<User | null> {
        return this.spRepository.findSPByEmail(Email);
    }

}