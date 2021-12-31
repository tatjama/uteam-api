import { IUserService } from './user.interface';
import { RegisterUserDto } from '../dto/register.user.dto';
import UsersDao from '../daos/users.dao';
import { UserModel } from '../models/User';

class UserService implements IUserService {
    create = async( resource: RegisterUserDto): Promise<number>=> {
        return UsersDao.registerUser(resource);
   } 

    findByEmailOrUsername = async(email: string, username: string): Promise<UserModel | null> => {
         return UsersDao.getUserByEmailOrUsername(email, username);
    }

}

export default new UserService();