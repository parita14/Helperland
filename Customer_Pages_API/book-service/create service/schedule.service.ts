import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
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

    public async getSP(ZipCode: number): Promise<User[]> {
        return this.scheduleRepository.getSP(ZipCode);
    }

    public serviceRequest(Email: string, ServiceId: number): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: `<html>
            <body>
            <h2>New Service Request Created of Service Id #${ServiceId}!</h2>
            <p>Logged in to your account to accept Service Request.</p>
            </body></html>`
        }
        return data;
    }

    public serviceForSP(Email: string, ServiceId: number): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: `<html>
            <body>
            <h2>New Service Request Created by Customer of Service Id #${ServiceId}!</h2>
            <p>This is directly assigned to you!</p>
            </body></html>`
        }
        return data;
    }

    public async findAddressEmail(Email: string): Promise<ServiceRequestAddress | null> {
        return this.scheduleRepository.findAddressEmail(Email);
    }

    public async getServiceAddresses(Email: string | undefined): Promise<ServiceRequestAddress[]> {
        return this.scheduleRepository.getServiceAddresses(Email);
    }

    public async createFAndB(FAndB: {[key: number | string]: FavoriteAndBlocked}): Promise<FavoriteAndBlocked> {
        return this.scheduleRepository.createFAndB(FAndB);
    }

    public async getFAndB(UserId: number): Promise<FavoriteAndBlocked[]> {
        return this.scheduleRepository.getFAndB(UserId);
    }

    public async findUserById(UserId: number | undefined): Promise<User | null> {
        return this.scheduleRepository.findUserById(UserId);
    }

    public async findById(UserId: number[]): Promise<User[]> {
        return this.scheduleRepository.findById(UserId);
    }

    public getTargetUser(user: FavoriteAndBlocked[]): number[] {
        let favSP = [];
        for(let u in user) {
            if(user[u].IsFavorite === true && user[u].IsBlocked === false) {
                favSP.push(user[u].TargetUserId);
            }
        }
        return favSP;
    }

    public async findSpById(UserId: number | undefined): Promise<User | null> {
        return this.scheduleRepository.findSpById(UserId);
    } 

    public async findBlockedSp(UserId: number, sp: User[]): Promise<FavoriteAndBlocked[] | null>{
        const spId: number[] = [];
        for(let s in sp) {
            spId.push(sp[s].UserId);
        }
        return this.scheduleRepository.findBlockedSp(UserId, spId);
    }

    public removeBlockedSp(User: User[], blockedSp: FavoriteAndBlocked[]): User[] {
        const users = User.filter((u) => {
            return blockedSp.every((s) => {
                return s.TargetUserId !== u.UserId;
            });
        });
        return users;
    }

    public getEmail(User: User[], body: any) {
        let Email = [];
        if(body.HasPets === true) {
            for(let u in User) {
                if(User[u].WorksWithPets === true)
                Email.push(User[u].Email!);
            }
        }
        else {
            for(let u in User) {
                Email.push(User[u].Email!);
            }
        }
        return Email;
    }

    public async findByTargetId(UserId: number, TargetUserId: number): Promise<FavoriteAndBlocked | null> {
        return this.scheduleRepository.findByTargetId(UserId, TargetUserId);
    }

}