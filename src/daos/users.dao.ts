import { User, UserModel } from "../models/User";
import { RegisterUserDto } from '../dto/register.user.dto';
import  { Op } from 'sequelize';

class UsersDao{ 
     registerUser = async(registerUserDto: RegisterUserDto): Promise<number> => {
      const user: UserModel=  await User.create(registerUserDto);      
      return user.id;
    }

    getUserByEmailOrUsername = async(email: string, username: string): Promise<UserModel | null> => {
      const user: UserModel | null= await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
      return user;
    }
 }

 export default new UsersDao();