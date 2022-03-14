import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { Rating } from "../../models/rating";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { rAndbRepository } from "./r&b.repository";
type Customer = {
    UserId: number,
    Name: string,
    Email: string,
    ZipCode: number | undefined
}

export class rAndbService {
    public constructor(private readonly rAndbRepository: rAndbRepository) {
        this.rAndbRepository = rAndbRepository;
    }

    public async findUser(Email: string): Promise<User | null> {
        return this.rAndbRepository.findUser(Email);
    }

    public async getAllRatings(RatingTo: number): Promise<Rating[]> {
        return this.rAndbRepository.getAllRatings(RatingTo);
    }

    public async findServiceBySpId(ServiceProviderId: number): Promise<ServiceRequest[]> {
        return this.rAndbRepository.findServiceBySpId(ServiceProviderId);
    }

    public findAllcustIdSpHadWorkedFor(service: ServiceRequest[]) {
        const custId: number[] = [];
        for(let s in service) {
            if(service[s].Status === 2 && service[s].UserId!= null) {
                custId.push(service[s].UserId!);
            }
        }
        return custId;
    }

    public async findAllcustSpHadWorkedFor(ServiceProviderId: number): Promise<Customer[] | void> {
        let cust: Customer[] = [];
        const service = await this.rAndbRepository.findAllcustSpHadWorkedFor(ServiceProviderId);
        if(service) {
            if(service.length > 0) {
                for(let s in service) {
                    const user = await this.rAndbRepository.findByUId(service[s].UserId!);
                    if(user) {
                        cust.push({
                            UserId: user.UserId,
                            Name: user.FirstName + " " + user.LastName,
                            Email: user.Email,
                            ZipCode: user.ZipCode
                        })
                    }
                }
            }
        }
        const userId = cust.map(o => o.UserId)
        const users = cust.filter(({ UserId }, index) => !userId.includes(UserId, index+1))
        return users;
    };

    public async findBlockedCust(UserId: number, custId: number): Promise<FavoriteAndBlocked | null> {
        return this.rAndbRepository.findBlockedCust(UserId, custId);
    }

    public async updateBlockedCust(blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]]> {
        return this.rAndbRepository.updateBlockedCust(blocked);
    }

    public async createBlockedCust(favorite: {[key: number | string]: FavoriteAndBlocked}): Promise<FavoriteAndBlocked | null> {
        return this.rAndbRepository.createBlockedCust(favorite);
    }

    public async Ratings(rating: Rating[]): Promise<Object[]> {
        let details: Object[] = [];
        for(let r in rating) {
            let service = await this.rAndbRepository.findService(rating[r].ServiceRequestId);

            const Time = (service?.ServiceHours);
            const Extra = (service?.ExtraHours);
            const StartTime = ((service?.ServiceStartTime!).toString().split(':'));
            const total = ((Time! + Extra!).toString()).split('.');
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
            service?.update({EndTime:time});

            let userdetails = await this.rAndbRepository
              .findByUId(rating[r].RatingFrom)
              .then((user) => {
                  if(service) {
                      if(user) {
                          details.push({
                            ServiceID: service.ServiceId,
                            ServiceStartDate: service.ServiceStartDate,
                            Duration: service.ServiceStartTime + " - " + time,
                            Name: user.FirstName + " " + user.LastName,
                            Comments: rating[r].Comments,
                            Ratings: rating[r].Ratings
                          });
                      }
                  }
              });
        }
        return details;
    }
}