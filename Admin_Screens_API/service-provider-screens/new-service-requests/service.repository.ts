import { Op } from "sequelize";
import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { User } from "../../models/user";

export class ServiceRepository {

    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllFutureRequest(ZipCode: number | undefined): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: {ZipCode: ZipCode, Status: 1} });
    }

    public async getServiceById(ServiceId: number, ZipCode: number | undefined): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: 1 } });
    }

    public async findServiceById(ServiceId: number, ZipCode: number | undefined): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: { [Op.or]: [1,4] } } });
    }

    public async updateServiceStatus(ServiceId: number, ZipCode: number | undefined, ServiceProviderId: number): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return db.ServiceRequest.update({ Status: 4, ServiceProviderId: ServiceProviderId, ModifiedBy: ServiceProviderId, SPAcceptedDate: Date.now() }, {where: { ServiceId: ServiceId, ZipCode: ZipCode }});
    }

    public async findAllSP(ZipCode: number): Promise<User[]> {
        return db.Users.findAll({ where: { ZipCode: ZipCode, UserTypeId: 2 } });
    }

    public async findUserById(UserId: number | undefined): Promise<User | null> {
        return db.Users.findOne({ where: { UserId: UserId, UserTypeId: 1 } });
    }

    public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
        return db.ServiceRequestAddress.findOne({ where: { ServiceRequestId: ServiceRequestId } });
    }

    public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
        return db.ServiceRequestExtra.findAll({ where: { ServiceRequestId: ServiceRequestId } });
    }

    public async findBlockedCustomerOfSP(UserId: number): Promise<FavoriteAndBlocked[] | null>{
        return db.FavoriteAndBlocked.findAll({ where: { UserId: UserId, IsBlocked: true } });
    }

    public async findServiceOfHelper(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: { ServiceProviderId: UserId, Status: 4 } });
    }

}