import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { HistoryRepository } from "./history.repository";
import { Rating } from "../../models/rating";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";

export class HistoryService {
    public constructor(private readonly historyRepository: HistoryRepository) {
        this.historyRepository = historyRepository;
    }
    
    public async findUser(Email: string): Promise<User | null> {
        return this.historyRepository.findUser(Email);
    }

    public async getAllPastRequest(UserId: number): Promise<ServiceRequest[]> {
        return this.historyRepository.getAllPastRequest(UserId);
    }

    public async getServiceById(ServiceId: number): Promise<ServiceRequest | null> {
        return this.historyRepository.getServiceById(ServiceId);
    }

    public async getServiceByRequestId(ServiceRequestId: number): Promise<ServiceRequest | null> {
        return this.historyRepository.getServiceByRequestId(ServiceRequestId);
    }

    public async giveRatings(Rating: Rating): Promise<Rating> {
        return this.historyRepository.giveRatings(Rating);
    }

    public async getRatingsById(ServiceRequestId: number): Promise<Rating | null> {
        return this.historyRepository.getRatingsById(ServiceRequestId);
    }

    public getRatings(body: any) {
        const avgRatings = ((body.OnTimeArrival + body.Friendly + body.QualityOfService)/3.0).toFixed(2);
        return avgRatings;
    }

    public async findUserById(UserId: number | undefined): Promise<User | null> {
        return this.historyRepository.findUserById(UserId);
    }

    public async findCustById(UserId: number | undefined): Promise<User | null> {
        return this.historyRepository.findCustById(UserId);
    }

    public async findRatings(RatingTo: number, RatingFrom: number, ServiceRequestId: number): Promise<Rating | null> {
        return this.historyRepository.findRatings(RatingTo, RatingFrom, ServiceRequestId);
    }

    public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
        return this.historyRepository.findExtraById(ServiceRequestId);
    }

    public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
        return this.historyRepository.findAddressById(ServiceRequestId);
    }

    public async serviceReq(service: ServiceRequest[]): Promise<Object[]> {
        let details: Object[] = [];
        for(let s in service) {
            let Name, Ratings, Avatar, Status;
            const userdetails = await this.historyRepository.findUserById(service[s].ServiceProviderId!);
            const ratingdetails = await this.historyRepository.findRatings(service[s].ServiceProviderId!, service[s].UserId!, service[s].ServiceRequestId);
            
            const Time = (service[s].ServiceHours);
            const Extra = (service[s].ExtraHours);
            const StartTime = ((service[s].ServiceStartTime).toString().split(':'));
            const total = ((Time+Extra!).toString()).split('.');
            var time:string ;
            if(StartTime[1] == "30"){
                if(total[1] == '5'){
                    time = (((+StartTime[0])+(+total[0])+1).toString())+":00:00";
                }
                else{
                    time = (((+StartTime[0])+(+total[0])).toString())+":30:00";
                }
            }
            else{
                if(total[1] == '5'){
                    time = (((+StartTime[0])+(+total[0])).toString())+":30:00";
                }
                else{
                    time = (((+StartTime[0])+(+total[0])).toString())+":00:00";
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

            if(service[s].Status === 3) {
                Status = 'Cancelled';
            }
            else if(service[s].Status === 2) {
                Status = 'Completed';
            }
            else if(service[s].Status === 5) {
                Status = 'Refunded';
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
                Payment: service[s].TotalCost + " €",
                Status: Status
            });
        }
        return details;
    }

    public async Export(service: ServiceRequest[]): Promise<Object[]>{
        let exportHistory: Object[] = [];
    
        for (let s in service) {
          let Name, Ratings, Avatar, Status;
          let userdetails = await this.historyRepository.findUserById(service[s].ServiceProviderId);
          const ratingdetails = await this.historyRepository.findRatings(service[s].ServiceProviderId!, service[s].UserId!, service[s].ServiceRequestId);

          const Time = (service[s].ServiceHours);
          const Extra = (service[s].ExtraHours);
          const StartTime = ((service[s].ServiceStartTime).toString().split(':'));
          const total = ((Time+Extra!).toString()).split('.');
          var time:string ;
          if(StartTime[1] == "30"){
              if(total[1] == '5'){
                  time = (((+StartTime[0])+(+total[0])+1).toString())+":00:00";
              }
              else{
                  time = (((+StartTime[0])+(+total[0])).toString())+":30:00";
              }
          }
          else{
              if(total[1] == '5'){
                  time = (((+StartTime[0])+(+total[0])).toString())+":30:00";
              }
              else{
                  time = (((+StartTime[0])+(+total[0])).toString())+":00:00";
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

          if(service[s].Status === 3) {
            Status = 'Cancelled';
          }
          else if(service[s].Status === 2) {
            Status = 'Completed';
          }
          else if(service[s].Status === 5) {
              Status = 'Refunded';
          }
          else {
            Status = null;
          }

          exportHistory.push({
            ServiceID: service[s].ServiceId,
            ServiceStartDate: service[s].ServiceStartDate,
            Duration: service[s].ServiceStartTime + " - " + time,
            ServiceProvider: {
                Name: Name,
                Ratings: Ratings,
                Avatar: Avatar
            },
            Payment: service[s].TotalCost + " €",
            Status: Status
          });
        }
        return exportHistory;
    }

}