import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";
import { ScheduleRepository } from "./schedule.repository";

export class ScheduleService {
    public constructor(private readonly scheduleRepository: ScheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return this.scheduleRepository.findByEmail(Email);
    }

    public async scheduleService(ServiceRequest: ServiceRequest): Promise<ServiceRequest> {
        return this.scheduleRepository.scheduleService(ServiceRequest);
    }

    public async getSP(ZipCode: number): Promise<User[]> {
        return this.scheduleRepository.getSP(ZipCode);
    }

    public async findAddressEmail(Email: string): Promise<ServiceRequestAddress | null> {
        return this.scheduleRepository.findAddressEmail(Email);
    }

    public async getServiceAddresses(Email: string | undefined): Promise<ServiceRequestAddress[]> {
        return this.scheduleRepository.getServiceAddresses(Email);
    }

    public async getFAndB(UserId: number): Promise<FavoriteAndBlocked[]> {
        return this.scheduleRepository.getFAndB(UserId);
    }

    public async findSpById(UserId: number | undefined): Promise<User | null> {
        return this.scheduleRepository.findSpById(UserId);
    } 

    public async findSpInFav(UserId: number, TargetUserId: number): Promise<FavoriteAndBlocked | null> {
        return this.scheduleRepository.findSpInFav(UserId, TargetUserId);
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

    public async getTargetUser(user: FavoriteAndBlocked[], ZipCode: number): Promise<Object[]> {
        let spId: number[] = [];
        let favSpDetail = [];
        for(let u in user) {
            spId.push(user[u].TargetUserId);
        }
        const blockedSp = await this.scheduleRepository.findAllBlockedCustOfSp(spId);
        
        const favSp = user.filter(a => !blockedSp.find( r => (r.UserId === a.TargetUserId && a.UserId === r.TargetUserId) ));
        for(let s in favSp) {
            const spDetail = await this.scheduleRepository.findSpById(favSp[s].TargetUserId);
            if(spDetail && spDetail.ZipCode === ZipCode) {
                favSpDetail.push({
                    ServiceProviderId: spDetail.UserId,
                    ServiceProviderName: spDetail.FirstName + " " + spDetail.LastName,
                    ProfilePicture: spDetail.UserProfilePicture
                });
            }
        }
        return favSpDetail;
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

    public async removeSPFromCust(UserId: number, SPs: User[]): Promise<User[]> {
        const spId: number[] = [];
        for(let s in SPs) {
            spId.push(SPs[s].UserId);
        }
        const blockedCust = await this.scheduleRepository.findSPBlockedCust(UserId, spId);
        let helper = SPs.filter((s) => {
            return !blockedCust.find((a) => {
                return a.UserId === s.UserId;
            });
        });
        return helper;
    }

    public async serviceAddress(address: ServiceRequestAddress[]): Promise<Object[]> {
        let details: Object[] = [];
        for(let a in address) {
            await details.push({
                Address: address[a].AddressLine1 + ", " + address[a].AddressLine2 + ", " + address[a].City + ", " + address[a].State + ", " + address[a].PostalCode,
                PhoneNumber: address[a].Mobile
                    
            });
        }
        return details;
    }
}