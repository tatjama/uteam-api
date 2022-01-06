import { IUserService } from './user.interface';
import { RegisterUserDto } from '../dto/register.user.dto';
import { LoginUserDto } from '../dto/login.user.dto';
import UsersDao from '../daos/users.dao';

class UserService implements IUserService {
    create = async( registerUserDto: RegisterUserDto): Promise<number>=> {
        return UsersDao.registerUser(registerUserDto);
   } 

    findByEmailOrUsername = async(email: string, username: string): Promise<LoginUserDto | null> => {
       return await UsersDao.getUserByEmailOrUsername(email, username);
    }

    getUsers = async(page: number, limit: number): Promise<LoginUserDto[]> => {
        return UsersDao.getUsers(page, limit);
    }

}

export default new UserService();