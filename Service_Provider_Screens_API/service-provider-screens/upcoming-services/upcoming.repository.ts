import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { User } from "../../models/user";

export class UpcomingRepository {

    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllUpcomingRequest(ZipCode: number | undefined): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: {ZipCode: ZipCode, Status: 4}, include: ['UserRequest', 'ServiceRequestAddress'] });
    }

    public async getServiceById(ServiceId: number, ZipCode: number | undefined): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ZipCode: ZipCode, Status: 4 }, include: ['UserRequest', 'ServiceRequestAddress', 'ExtraService'] });
    }

    public async updateServiceStatus(ServiceId: number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update({ Status: 1, ServiceProviderId: null, SPAcceptedDate: null }, {where: { ServiceId: ServiceId }});
    }

    public async findCustById(UserId: number): Promise<User | null> {
        return db.Users.findOne({ where: { UserId: UserId, UserTypeId: 1 } });
    }

    public async completeService(ServiceId: number): Promise<[number, ServiceRequest[]]> {
        return db.ServiceRequest.update({ Status: 2}, { where: { ServiceId: ServiceId } });
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

}