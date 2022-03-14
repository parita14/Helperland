import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { FavRepository } from "./fav.repository";

export class FavService {

    public constructor(private readonly favRepository: FavRepository) {
        this.favRepository = favRepository;
    }

    public async findFavoriteSp(UserId: number, spId:number): Promise<FavoriteAndBlocked|null> {
        return this.favRepository.findFavoriteSp(UserId, spId);
    }

    public async updateFavoriteSp(favorite: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
        return this.favRepository.updateFavoriteSp(favorite);
    }

    public async createFavoriteSp(favorite: {[key: number|string]: FavoriteAndBlocked}): Promise<FavoriteAndBlocked | null> {
        return this.favRepository.createFavoriteSp(favorite);
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return this.favRepository.findByEmail(Email);
    }

    public async findServiceById(UserId: number): Promise<ServiceRequest[]> {
        return this.favRepository.findServiceById(UserId);
    }

    public findAllSpIdWorkedWithCustInPast(service: ServiceRequest[]) {
        const spId: number[] = [];
        for(let s in service) {
            if(service[s].Status === 2 && service[s].ServiceProviderId != null) {
                spId.push(service[s].ServiceProviderId!);
            }
        }
        return spId;
    }

    public async findAllSPWorkedWithCustInPast(UserId: number[]): Promise<User[] | null> {
        return this.favRepository.findAllSPWorkedWithCustInPast(UserId);
    }

    public async updateBlockedSp(blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
        return this.favRepository.updateBlockedSp(blocked);
    }

}