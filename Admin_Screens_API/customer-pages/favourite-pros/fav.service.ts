import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { FavRepository } from "./fav.repository";
type SP = {
    UserId: number,
    Name: string,
    Avatar: string | undefined,
    Email: string,
    ZipCode: number | undefined
}

export class FavService {

    public constructor(private readonly favRepository: FavRepository) {
        this.favRepository = favRepository;
    }

    public async findFavoriteSp(UserId: number, spId:number): Promise<FavoriteAndBlocked|null> {
        return this.favRepository.findFavoriteSp(UserId, spId);
    }

    public async updateFavoriteSp(favorite: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]] | [affectedCount: number]> {
        return this.favRepository.updateFavoriteSp(favorite);
    }

    public async createFavoriteSp(favorite: FavoriteAndBlocked): Promise<FavoriteAndBlocked | null> {
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

    public async updateBlockedSp(blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]] | [affectedCount: number]> {
        return this.favRepository.updateBlockedSp(blocked);
    }

    public async findAllSpWorkedWithCust(UserId: number[]): Promise<SP[] | void> {
        let cust: SP[] = [];
        const service = await this.favRepository.findAllSPWorkedWithCustInPast(UserId);
        if(service) {
            if(service.length > 0) {
                for(let s in service) {
                    const user = await this.favRepository.findByUId(service[s].UserId!);
                    if(user) {
                        cust.push({
                            UserId: user.UserId,
                            Name: user.FirstName + " " + user.LastName,
                            Avatar: user.UserProfilePicture,
                            Email: user.Email,
                            ZipCode: user.ZipCode
                        })
                    }
                }
            }
        }
        const userId = cust.map(o => o.UserId)
        const users = cust.filter(({ UserId }, index) => !userId.includes(UserId, index+1))
        return users;
    };

}