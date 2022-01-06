import { User, UserModel } from "../models/User";
import { RegisterUserDto } from '../dto/register.user.dto';
import { LoginUserDto, createLoginUserDto } from '../dto/login.user.dto';
import  { Op } from 'sequelize';
class UsersDao{ 
     registerUser = async(registerUserDto: RegisterUserDto): Promise<number> => {
      const user: UserModel =  await User.create(registerUserDto);      
      return user.id;
    }

    getUserByEmailOrUsername = async(email: string, username: string): Promise<LoginUserDto | null> => {
      const user: UserModel | null= await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
      return user? createLoginUserDto(user.id, user.username, user.email, user.password): null;      
    }

    getUsers = async(page: number, limit: number): Promise<LoginUserDto[]> => {
      const users: UserModel[] = await User.findAll({offset: page *limit | 0, limit:limit | 10});
      return users.map(user => createLoginUserDto(user.id, user.username, user.email, user.password))
    }
 }

 export default new UsersDao();