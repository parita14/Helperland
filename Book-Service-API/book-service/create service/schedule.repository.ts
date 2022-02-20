import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";

export class ScheduleRepository {

    public async findByZipCode(ZipCode: number): Promise<User | null> {
        return db.Users.findOne({ where: {ZipCode: ZipCode} });
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async getSP(): Promise<User[]> {
        return db.Users.findAll({ where: {UserTypeId: 2} });
    }

    public async scheduleService(ServiceRequest: {[key: number | string] : ServiceRequest}): Promise<ServiceRequest> {
        return db.ServiceRequest.create(ServiceRequest, {include: ['ServiceRequestAddress', 'ExtraService' ]});
    }
}