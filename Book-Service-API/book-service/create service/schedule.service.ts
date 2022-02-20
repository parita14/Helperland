import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { ScheduleRepository } from "./schedule.repository";

export class ScheduleService {
    public constructor(private readonly scheduleRepository: ScheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public async findByZipCode(ZipCode: number): Promise<User | null> {
        return this.scheduleRepository.findByZipCode(ZipCode);
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return this.scheduleRepository.findByEmail(Email);
    }

    public async scheduleService(ServiceRequest: {[key: number | string] : ServiceRequest}): Promise<ServiceRequest> {
        return this.scheduleRepository.scheduleService(ServiceRequest);
    }

    public async getSP(): Promise<User[]> {
        return this.scheduleRepository.getSP();
    }

    public serviceRequest(Email: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: `<html>
            <body>
            <h2>New Service Request Created!</h2>
            <p>Logged in to your account to accept Service Request.</p>
            </body></html>`
        }
        return data;
    }

}