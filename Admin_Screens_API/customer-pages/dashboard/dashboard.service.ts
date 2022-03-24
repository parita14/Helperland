import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { DashboardRepository } from "./dashboard.repository";
import moment from "moment";
import { time } from "console";
import { Rating } from "../../models/rating";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";

export class DashboardService {
    public constructor(private readonly dashboardRepository: DashboardRepository) {
        this.dashboardRepository = dashboardRepository;
    }

    public async findUser(Email: string): Promise<User | null> {
        return this.dashboardRepository.findUser(Email);
    }

    public async getAllFutureRequest(UserId: number): Promise<ServiceRequest[]> {
        return this.dashboardRepository.getAllFutureRequest(UserId);
    }

    public async getServiceById(ServiceId: number): Promise<ServiceRequest | null> {
        return this.dashboardRepository.getServiceById(ServiceId);
    }

    public async findServiceById(ServiceId: number): Promise<ServiceRequest | null> {
        return this.dashboardRepository.findServiceById(ServiceId);
    }

    public async updateService(ServiceId: number, ServiceStartDate: Date, ServiceStartTime: string): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return this.dashboardRepository.updateService(ServiceId, ServiceStartDate, ServiceStartTime);
    }

    public compareDate(ServiceStartDate: Date) {
        const date1 = new Date(ServiceStartDate);
        const date2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
        console.log(date1);                            
        if(date1 > date2) {
            return true
        }
        else {
            return false;
        }
    }

    public async updateServiceStatus(ServiceId: number): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return this.dashboardRepository.updateServiceStatus(ServiceId);
    }

    public async findSPById(UserId: number): Promise<User | null> {
        return this.dashboardRepository.findSPById(UserId);
    }

    public cancleService(Email: string, ServiceId: number | undefined, Reason: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Cancellation of Service',
            html: `<!DOCTYPE>
            <html>
            <body>
            <h3>"Service Request assigned to you of ServiceId ${ServiceId} is cancelled by Customer due to this reason."</h3>
            <h3>Reason: ${Reason}.</h3>
            </body>
            </html>`
        }
        return data;
    }

    public async findByAllSPId(ServiceProviderId: number): Promise<ServiceRequest[] | null> {
        return this.dashboardRepository.findByAllSPId(ServiceProviderId);
    }

    public SPHasFutureSameDateTime( ServiceStartDate: Date, ServiceRequest: ServiceRequest[], totalHour: number, ServiceStartTime: string ) {
        let startDate;
        let startTime;
        let endTime;
        const uTime = ServiceStartTime.split(":");
        if(uTime[1] === '30') {
            uTime[1] = '0.5';
        }
        const updateTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
        const enteredDate = new Date(ServiceStartDate);
        let isMatch;
        for(let s in ServiceRequest) {
            if(new Date(ServiceRequest[s].ServiceStartDate).getTime() > enteredDate.getTime()) {
                isMatch = false;
            }
            else if(new Date(ServiceRequest[s].ServiceStartDate).getTime() < enteredDate.getTime()) {
                isMatch = false;
            }
            else {
                const time = ServiceRequest[s].ServiceStartTime.toString().split(":");
                if(time[1] === '30') {
                    time[1] = '0.5';
                }
                const availableTime = parseFloat(time[0]) + parseFloat(time[1]);
                const availableHour = ServiceRequest[s].ServiceHours + ServiceRequest[s].ExtraHours!;
                if(updateTime + totalHour < availableTime || availableTime + availableHour < updateTime) {
                    isMatch = false;
                }
                else {
                    startDate = ServiceRequest[s].ServiceStartDate;
                     const srTime = availableTime.toString().split('.');
                     if(srTime[1] === '5') {
                         srTime[1] = '30'
                     }
                     else {
                         srTime[1] = '00'
                     }
                     startTime = srTime.join(':');

                     const eTime = (availableTime + availableHour).toString().split('.');
                     if(parseInt(eTime[1]) === 5) {
                         eTime[1] = '30';
                     }
                     else {
                         eTime[1] = '00';
                     }
                     endTime = eTime.join(':');
                     isMatch = true;
                     break;
                }
            }
        }
        return { isMatch, startDate, startTime, endTime };
    }

    public rescheduleService(ServiceStartDate: Date, ServiceStartTime: string, Email: string, ServiceId: number): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Rescheduled Service Request',
            html: `
                <!DOCTYPE>
                <html>
                <body>
                <h3>"Service Request assigned to you of ServiceId ${ServiceId} is rescheduled by customer. New date and time are ${ServiceStartDate} ${ServiceStartTime}".</h3>
                </body>
                </html>
                `
        }
        return data;
    };
    
    public async serviceReq(service: ServiceRequest[]): Promise<Object[]> {
        let details: Object[] = [];
        for(let s in service) {
            let Name, Ratings, Avatar;
            const userdetails = await this.dashboardRepository.findUserById(service[s].ServiceProviderId!);
            const ratingdetails = await this.dashboardRepository.findRatings(service[s].ServiceProviderId!, service[s].UserId!, service[s].ServiceRequestId);
            
            const Time = (service[s].ServiceHours);
            const Extra = (service[s].ExtraHours);
            const StartTime = ((service[s].ServiceStartTime).toString().split(':'));
            const total = ((Time+Extra!).toString()).split('.');
            var time:string ;
            if(StartTime[1] == "30"){
                if(total[1] == '5'){
                    time = (((+StartTime[0])+(+total[0])+1).toString())+":00";
                }
                else{
                    time = (((+StartTime[0])+(+total[0])).toString())+":30";
                }
            }
            else{
                if(total[1] == '5'){
                    time = (((+StartTime[0])+(+total[0])).toString())+":30";
                }
                else{
                    time = (((+StartTime[0])+(+total[0])).toString())+":00";
                } 
            }
            service[s].update({EndTime:time});

            if(userdetails) {
                Name = userdetails.FirstName + " " + userdetails.LastName;
                Avatar = userdetails.UserProfilePicture;
            }
            else {
                Name = null;
                Avatar = null;
            }

            if(ratingdetails) {
                Ratings = ratingdetails.Ratings;
            }
            else {
                Ratings = null;
            }
           
            await details.push({
                ServiceID: service[s].ServiceId,
                ServiceStartDate: service[s].ServiceStartDate,
                Duration: service[s].ServiceStartTime + " - " + time,
                ServiceProvider: {
                    Name: Name,
                    Ratings: Ratings,
                    Avatar: Avatar
                },
                Payment: service[s].TotalCost + " €"
            });
        }
        return details;
    }

    public async findUserById(UserId: number | undefined): Promise<User | null> {
        return this.dashboardRepository.findUserById(UserId);
    }

    public async findCustById(UserId: number | undefined): Promise<User | null> {
        return this.dashboardRepository.findCustById(UserId);
    }

    public async findRatings(RatingTo: number, RatingFrom: number, ServiceRequestId: number): Promise<Rating | null> {
        return this.dashboardRepository.findRatings(RatingTo, RatingFrom, ServiceRequestId);
    }

    public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
        return this.dashboardRepository.findExtraById(ServiceRequestId);
    }

    public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
        return this.dashboardRepository.findAddressById(ServiceRequestId);
    }
}