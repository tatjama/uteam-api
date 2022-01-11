import { User, UserModel } from "../models/User";
import { RegisterUserDto } from '../dto/register.user.dto';
import { UserDto, createUserDto } from '../dto/user.dto';
import  { Op } from 'sequelize';
import bcryptjs from 'bcryptjs';
class UsersDao{ 
     registerUser = async(registerUserDto: RegisterUserDto): Promise<number> => {
      const user: UserModel =  await User.create(registerUserDto);      
      return user.id;
    }

    getUserByEmailOrUsername = async(email: string, username: string): Promise<UserDto | null> => {
      const user: UserModel | null= await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
      return user? createUserDto(user.id, user.username, user.email): null;      
    }

    verifyLogin = async(email: string, username: string, password: string): Promise<UserDto | null> => {
      const user: UserModel | null = await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
      if(user){
        if( bcryptjs.compareSync(password, user.password)){
          return createUserDto(user.id, user.username, user.email)
          }else{
          return null  
     }
      }else{
          return null
      }
    }

    getUsers = async(page: number, limit: number): Promise<UserDto[]> => {
      const users: UserModel[] = await User.findAll({offset: page *limit | 0, limit:limit | 10});
      return users.map(user => createUserDto(user.id, user.username, user.email))
    }
 }

 export default new UsersDao();