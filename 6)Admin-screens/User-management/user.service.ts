import { UserRepository } from "./user.repository";
import { User } from "../../models/user";

export class UserService {
    public constructor(private readonly userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async findUser(Email: string): Promise<User | null> {
        return this.userRepository.findUser(Email);
    }

    public async findAllUsers(): Promise<User[]> {
        return this.userRepository.findAllUsers();
    }

    public async activateUser(Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return this.userRepository.activateUser(Email);
    }

    public async deactivateUser(Email: string): Promise<[number, User[]] | [affectedCount: number]> {
        return this.userRepository.deactivateUser(Email);
    }

    public async userdetails(user: User[]): Promise<Object[]> {
        let details: Object[] = [];
        for(let u in user) {
            let UserType;
            let Status;
            if(user[u].UserTypeId === 1) {
                UserType = 'Customer';
            }
            else if(user[u].UserTypeId === 2) {
                UserType = 'Service Provider';
            }
            else {
                UserType = null;
            }

            if(user[u].IsApproved === true) {
                Status = 'Active';
            }
            else {
                Status = 'Deactive';
            }
            await details.push({
                UserName: user[u].FirstName + " " + user[u].LastName,
                DateOfRegistration: user[u].DateOfRegistration,
                UserType: UserType,
                Phone: user[u].Mobile,
                PostalCode: user[u].ZipCode,
                Status: Status,  
            });
        }
        return details;
    }

    public async Export(user: User[]): Promise<Object[]>{
        let exportusers: Object[] = [];
    
        for (let u in user) {
            let UserType;
            let Status;
            if(user[u].UserTypeId === 1) {
                UserType = 'Customer';
            }
            else if(user[u].UserTypeId === 2) {
                UserType = 'Service Provider';
            }
            else {
                UserType = null;
            }

            if(user[u].IsApproved === true) {
                Status = 'Active';
            }
            else {
                Status = 'Deactive';
            }
          exportusers.push({
            UserName: user[u].FirstName + " " + user[u].LastName,
            DateOfRegistration: user[u].DateOfRegistration,
            UserType: UserType,
            Phone: user[u].Mobile,
            PostalCode: user[u].ZipCode,
            Status: Status, 
          });
        }
        return exportusers;
    }
}