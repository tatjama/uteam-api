import { User, UserModel } from "../models/User";
import { RegisterUserDto } from '../dto/register.user.dto';
import  { Op } from 'sequelize';

class UsersDao{ 
    async registerUser(registerUserDto: RegisterUserDto){
      const user: UserModel=  await User.create(registerUserDto);      
      return user.id
    }

    async getUserByEmailOrUsername(email: string, username: string){
      const user: UserModel | null= await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
      return user;
    }
 }

 export default new UsersDao();