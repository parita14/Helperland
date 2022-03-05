import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { HistoryRepository } from "./history.repository";
import { Rating } from "../../models/rating";

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

    public async giveRatings(Rating: {[key: number | string] : Rating}): Promise<Rating> {
        return this.historyRepository.giveRatings(Rating);
    }

    public async getRatingsById(ServiceRequestId: number): Promise<Rating | null> {
        return this.historyRepository.getRatingsById(ServiceRequestId);
    }

    public getRatings(body: any) {
        const avgRatings = ((body.OnTimeArrival + body.Friendly + body.QualityOfService)/3.0).toFixed(2);
        return avgRatings;
    }

}