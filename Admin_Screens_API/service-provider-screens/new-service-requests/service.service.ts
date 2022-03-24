import { ServiceRequest } from "../../models/servicerequest";
import { ServiceRequestAddress } from "../../models/servicerequestaddress";
import { ServiceRequestExtra } from "../../models/servicerequestextra";
import { User } from "../../models/user";
import { ServiceRepository } from "./service.repository";

export class ServiceService {
    public constructor(private readonly serviceRepository: ServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public async findUser(Email: string): Promise<User | null> {
        return this.serviceRepository.findUser(Email);
    }

    public async getAllFutureRequest(ZipCode: number | undefined, UserId: number): Promise<ServiceRequest[] | void> {
        let service: ServiceRequest[] = [];
        const serviceReq = await this.serviceRepository.getAllFutureRequest(ZipCode);
        const blockedCust = await this.serviceRepository.findBlockedCustomerOfSP(UserId);
        if(serviceReq) {
            if(blockedCust) {
                service = serviceReq.filter(s =>
                    !blockedCust.find(remove => 
                        (remove.TargetUserId === s.UserId)
                    ) 
                );
            }
        }
        return service;
    }

    public async getServiceById(ServiceId: number, ZipCode: number | undefined): Promise<ServiceRequest | null> {
        return this.serviceRepository.getServiceById(ServiceId, ZipCode);
    }

    public async findServiceById(ServiceId: number, ZipCode: number | undefined): Promise<ServiceRequest | null> {
        return this.serviceRepository.findServiceById(ServiceId, ZipCode);
    }

    public async updateServiceStatus(ServiceId: number, ZipCode: number | undefined, ServiceProviderId: number): Promise<[number, ServiceRequest[]] | [affectedCount: number]> {
        return this.serviceRepository.updateServiceStatus(ServiceId, ZipCode, ServiceProviderId);
    }

    public newservice(Email: string, ServiceId: number): typeof data{
        const data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request Accepted',
            html: `<html>
            <body>
            <h3>Service Request with Service Id #${ServiceId} has already been accepted by someone and is no more available to you!</h3>
            </body></html>`
        }
        return data;
    }

    public async findAllSP(ZipCode: number): Promise<User[]> {
        return this.serviceRepository.findAllSP(ZipCode);
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
 
    public async serviceReq(service: ServiceRequest[]): Promise<Object[]> {
        let details: Object[] = [];
        for(let s in service) {
            const userdetails = await this.serviceRepository.findUserById(service[s].UserId!);
            const addressdetails = await this.serviceRepository.findAddressById(service[s].ServiceRequestId);

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
        return this.serviceRepository.findUserById(UserId);
    }

    public async findAddressById(ServiceRequestId: number): Promise<ServiceRequestAddress | null> {
        return this.serviceRepository.findAddressById(ServiceRequestId);
    }

    public async findExtraById(ServiceRequestId: number): Promise<ServiceRequestExtra[]> {
        return this.serviceRepository.findExtraById(ServiceRequestId);
    }

    public async findServiceOfHelper(UserId: number): Promise<ServiceRequest[]> {
        return this.serviceRepository.findServiceOfHelper(UserId);
    }

    public helperHasFutureSameDateAndTime(
        date: Date,
        serviceRequest: ServiceRequest[],
        acceptTotalHour: number,
        time: number
      ) {
        let srId;
        let matched = false;
        for (let sr in serviceRequest) {
          if (serviceRequest[sr].ServiceStartDate.getTime() === date.getTime()) {
            const acceptTime = time.toString().split(":");
            if (acceptTime[1] === "30") {
              acceptTime[1] = "0.5";
            }
            const acceptStartTime =
              parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
    
            const availableTime =
              serviceRequest[sr].ServiceStartTime.toString().split(":");
            if (availableTime[1] === "30") {
              availableTime[1] = "0.5";
            }
            const availableStartTime =
              parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
            const availableTotalHour =
              serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours!;
            const totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
            const totalAvailableTime = availableStartTime + availableTotalHour + 1;
            if (
              availableStartTime >= totalAcceptTime ||
              acceptStartTime >= totalAvailableTime
            ) {
              matched = false;
            } else {
              srId = serviceRequest[sr].ServiceId;
              matched = true;
              break;
            }
          } else {
            matched = false;
          }
        }
        return {matched, srId};
      }
}