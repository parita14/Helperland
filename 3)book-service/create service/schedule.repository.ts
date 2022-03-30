import { Op } from "sequelize";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";

export class ScheduleRepository {

    public async findByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async getSP(ZipCode: number): Promise<User[]> {
        return db.Users.findAll({ where: {UserTypeId: 2, ZipCode: ZipCode}, include: 'TargetUserId' });
    }

    public async scheduleService(ServiceRequest: ServiceRequest): Promise<ServiceRequest> {
        return db.ServiceRequest.create(ServiceRequest, {include: ['ServiceRequestAddress', 'ExtraService' ]});
    }

    public async findAddressEmail(Email: string): Promise<ServiceRequestAddress | null> {
        return db.ServiceRequestAddress.findOne({ where: {Email: Email} });
    }

    public async getServiceAddresses(Email: string | undefined): Promise<ServiceRequestAddress[]> {
        return db.ServiceRequestAddress.findAll({ where: { Email: Email } });
    }

    public async getFAndB(UserId: number): Promise<FavoriteAndBlocked[]> {
        return db.FavoriteAndBlocked.findAll({ where: { UserId: UserId, IsFavorite: true } });
    }

    public async findSpById(UserId: number | undefined): Promise<User | null> {
        return db.Users.findOne({ where: { UserId: UserId, UserTypeId: 2 } });
    } 

    public async findSpInFav(UserId: number, TargetUserId: number): Promise<FavoriteAndBlocked | null> {
        return db.FavoriteAndBlocked.findOne({ where: { UserId: UserId, TargetUserId: TargetUserId, IsFavorite: true, IsBlocked: false } });
    }

    public async findBlockedSp(UserId: number, spId: number[]): Promise<FavoriteAndBlocked[] | null>{
        return db.FavoriteAndBlocked.findAll({ where: { UserId:UserId, TargetUserId: { [Op.or]: spId }, IsBlocked: true } });
    }

    public async findAllBlockedCustOfSp(UserId: number[]): Promise<FavoriteAndBlocked[]>{
        return db.FavoriteAndBlocked.findAll({ where:{ UserId: { [Op.or]: UserId }, IsBlocked:true } });
    }

    public async findSPBlockedCust(UserId: number, spId: number[]): Promise<FavoriteAndBlocked[]> {
        return db.FavoriteAndBlocked.findAll({ where: { UserId: { [Op.or]: spId }, TargetUserId: UserId, IsBlocked: true } });
    }

}