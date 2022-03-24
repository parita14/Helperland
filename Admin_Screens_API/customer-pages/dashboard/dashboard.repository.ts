import moment from "moment";
import { Op } from "sequelize";
import { db } from "../../models/index";
import { Rating } from "../../models/rating";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { User } from "../../models/user";

export class DashboardRepository {

    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllFutureRequest(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: {UserId: UserId, Status: 1}, include: ['HelperRequest'] });
    }

    public async getServiceById(ServiceId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, Status: 1 }, include: ['HelperRequest', 'ServiceRequestAddress', 'ExtraService'] });
    }

    public async findServiceById(ServiceId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, Status: { [Op.or]: [1, 3, 4] }}, include: ['HelperRequest', 'ServiceRequestAddress', 'ExtraService'] });
    }

    public async updateService(ServiceId: number, ServiceStartDate: Date, ServiceStartTime: string): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return db.ServiceRequest.update({ ServiceStartDate: ServiceStartDate, ServiceStartTime: ServiceStartTime }, { where: { ServiceId: ServiceId } });
    }

    public async updateServiceStatus(ServiceId: number): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return db.ServiceRequest.update({ Status: 3 }, {where: { ServiceId: ServiceId }});
    }

    public async findSPById(UserId: number): Promise<User | null> {
        return db.Users.findOne({ where: { UserId: UserId, UserTypeId: 2 } });
    }

    public async findByAllSPId(ServiceProviderId: number): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({ where: { ServiceProviderId: ServiceProviderId } });
    }

    public async findUserById(UserId: number | undefined): Promise<User | null> {
        return db.Users.findOne({ where: { UserId: UserId, UserTypeId: 2 } });
    }

    public async findCustById(UserId: number | undefined): Promise<User | null> {
        return db.Users.findOne({ where: { UserId: UserId, UserTypeId: 1 } });
    }

    public async findRatings(RatingTo: number, RatingFrom: number, ServiceRequestId: number): Promise<Rating | null> {
        return db.Rating.findOne({ where: { RatingTo: RatingTo, RatingFrom: RatingFrom, ServiceRequestId: ServiceRequestId } });
    }

    public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
        return db.ServiceRequestExtra.findAll({ where: { ServiceRequestId: ServiceRequestId } });
    }

    public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
        return db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: ServiceRequestId } });
    }
}