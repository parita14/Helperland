import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { User } from "../../models/user";
import { UpcomingRepository } from "./upcoming.repository";

export class UpcomingService {

    public constructor(private readonly upcomingRepository: UpcomingRepository) {
        this.upcomingRepository = upcomingRepository;
    }

    public async findUser(Email: string): Promise<User | null> {
        return this.upcomingRepository.findUser(Email);
    }

    public async getAllUpcomingRequest(ZipCode: number | undefined): Promise<ServiceRequest[]> {
        return this.upcomingRepository.getAllUpcomingRequest(ZipCode);
    }

    public async getServiceById(ServiceId: number, ZipCode: number | undefined): Promise<ServiceRequest | null> {
        return this.upcomingRepository.getServiceById(ServiceId, ZipCode);
    }

    public async updateServiceStatus(ServiceId: number): Promise<[number, ServiceRequest[]]> {
        return this.upcomingRepository.updateServiceStatus(ServiceId);
    }

    public async findCustById(UserId: number): Promise<User | null> {
        return this.upcomingRepository.findCustById(UserId);
    }

    public cancleService(Email: string, ServiceId: number | undefined, Reason: string): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Cancellation of Service',
            html: `<!DOCTYPE>
            <html>
            <body>
            <h3>"Service Request booked by you of ServiceId ${ServiceId} is cancelled by Service Provider due to this reason."</h3>
            <h3>Reason: ${Reason}.</h3>
            <p>Wait until another Service Provider accept your Service Request.</p>
            </body>
            </html>`
        }
        return data;
    }

    public async completeService(ServiceId: number): Promise<[number, ServiceRequest[]]> {
        return this.upcomingRepository.completeService(ServiceId);
    }

    public async serviceReq(service: ServiceRequest[]): Promise<Object[]> {
        let details: Object[] = [];
        for(let s in service) {
            const userdetails = await this.upcomingRepository.findUserById(service[s].UserId!);
            const addressdetails = await this.upcomingRepository.findAddressById(service[s].ServiceRequestId);

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
                if(addressdetails) {
                    await details.push({
                        ServiceID: service[s].ServiceId,
                        ServiceStartDate: service[s].ServiceStartDate,
                        Duration: service[s].ServiceStartTime + " - " + time,
                        CustomerDetails: {
                            Name: userdetails.FirstName + " " + userdetails.LastName,
                            Address: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                        },
                        Payment: service[s].TotalCost + " €"
                    });
                }
            }
        }
        return details;
    }

    public async findUserById(UserId: number | undefined): Promise<User | null> {
        return this.upcomingRepository.findUserById(UserId);
    }

    public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
        return this.upcomingRepository.findAddressById(ServiceRequestId);
    }

    public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
        return this.upcomingRepository.findExtraById(ServiceRequestId);
    }

}