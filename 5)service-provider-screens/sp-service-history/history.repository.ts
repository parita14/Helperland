import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { db } from "../../models/index";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";

export class SpHistoryRepository {

    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllCompletedRequest(ServiceProviderId: number, ZipCode: number | undefined): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: {ServiceProviderId: ServiceProviderId, ZipCode: ZipCode, Status: 2}, include: ['UserRequest', 'ServiceRequestAddress'] });
    }

    public async getServiceById(ServiceId: number, ServiceProviderId: number, ZipCode: number | undefined): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId, ServiceProviderId: ServiceProviderId, ZipCode: ZipCode, Status: 2 }, include: ['UserRequest', 'ServiceRequestAddress', 'ExtraService'] });
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