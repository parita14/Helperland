import moment from "moment";
import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { User } from "../../models/user";
import { SpHistoryRepository } from "./history.repository";

export class SpHistoryService {
    public constructor(private readonly spHistoryRepository: SpHistoryRepository) {
        this.spHistoryRepository = spHistoryRepository;
    }

    public async findUser(Email: string): Promise<User | null> {
        return this.spHistoryRepository.findUser(Email);
    }

    public async getAllCompletedRequest(ZipCode: number | undefined): Promise<ServiceRequest[]> {
        return this.spHistoryRepository.getAllCompletedRequest(ZipCode);
    }

    public async getServiceById(ServiceId: number, ZipCode: number | undefined): Promise<ServiceRequest | null> {
        return this.spHistoryRepository.getServiceById(ServiceId, ZipCode);
    }

    public async serviceReq(service: ServiceRequest[]): Promise<Object[]> {
        let details: Object[] = [];
        for(let s in service) {
            const userdetails = await this.spHistoryRepository.findUserById(service[s].UserId!);
            const addressdetails = await this.spHistoryRepository.findAddressById(service[s].ServiceRequestId);

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
        return this.spHistoryRepository.findUserById(UserId);
    }

    public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
        return this.spHistoryRepository.findAddressById(ServiceRequestId);
    }

    public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
        return this.spHistoryRepository.findExtraById(ServiceRequestId);
    }

    public compareDate(history: ServiceRequest[]) {
        const sphistory: ServiceRequest[] = [];
        const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));
    
        for (let h in history) {
          const date = history[h].ServiceStartDate;
          const ServiceStartDate = new Date(moment(date).format("YYYY-MM-DD"));
    
          if (ServiceStartDate <= currentDate) {
            sphistory.push(history[h]);
          }
        }
        return sphistory;
    }
    
    public async Export(service: ServiceRequest[]): Promise<Object[]>{
        let exportHistory: Object[] = [];
    
        for (let s in service) {
          let userdetails = await this.findUserById(service[s].UserId);
          const addressdetails = await this.spHistoryRepository.findAddressById(service[s].ServiceRequestId);

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
          exportHistory.push({
            ServiceId: service[s].ServiceId,
            StartDate: service[s].ServiceStartDate,
            Duration: service[s].ServiceStartTime + " - " + time,
            CustomerName: userdetails?.FirstName + " " + userdetails?.LastName,
            Address: addressdetails?.AddressLine1 + ", " + addressdetails?.AddressLine2 + ", " + addressdetails?.City + ", " + addressdetails?.PostalCode
          });
        }
        return exportHistory;
    }

}