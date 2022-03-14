import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { Rating } from "../../models/rating";

export class HistoryRepository {
    
    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllPastRequest(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: { UserId: UserId, Status: {[Op.or] : [2,3]} }, include: ['HelperRequest', 'ServiceRating'] });
    }

    public async getServiceById(ServiceId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, Status: {[Op.or] : [2,3]} }, include: ['HelperRequest', 'ServiceRequestAddress', 'ExtraService', 'ServiceRating'] });
    }

    public async getServiceByRequestId(ServiceRequestId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId}, include: ['HelperRequest', 'ServiceRequestAddress', 'ExtraService', 'ServiceRating'] });
    }

    public async giveRatings(Rating: {[key: number | string] : Rating}): Promise<Rating> {
        return db.Rating.create(Rating);
    }

    public async getRatingsById(ServiceRequestId: number): Promise<Rating | null> {
        return db.Rating.findOne({ where: { ServiceRequestId: ServiceRequestId } });
    }

}