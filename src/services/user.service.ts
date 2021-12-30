import { IUserService } from './user.interface';
import { RegisterUserDto } from '../dto/register.user.dto';
import UsersDao from '../daos/users.dao';

class UserService implements IUserService {
   //async findAll: (limit: number, page: number) => Promise<any>;


   async create( resource: RegisterUserDto){
        return UsersDao.registerUser(resource);
   } 


    //findById: (id: string) => Promise<any>;

    async findByEmailOrUsername(email: string, username: string){
         return UsersDao.getUserByEmailOrUsername(email, username);
    }

}

export default new UserService();