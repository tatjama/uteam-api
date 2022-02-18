import { IUserService } from './user.interface';
import { RegisterUserDto } from '../dto/register.user.dto';
import UsersDao from '../dao/users.dao';
import { UserDto } from '../dto/user.dto';

class UserService implements IUserService {
    create = async( registerUserDto: RegisterUserDto): Promise<number> => {
        return UsersDao.registerUser(registerUserDto);
   } 

   findByUsername = async (username: string): Promise<number | null> => {
       return UsersDao.getUserIdByUsername(username);
   }

    findByEmailOrUsername = async(email: string, username: string): Promise<UserDto | null> => {
       return await UsersDao.getUserByEmailOrUsername(email, username);
    }

    findById = async(id:string): Promise<UserDto | null> => {
        return await UsersDao.getUserById(id);
    }

    getUsers = async(page: number, limit: number): Promise<UserDto[]> => {
        return UsersDao.getUsers(page, limit);
    }

}

export default new UserService();