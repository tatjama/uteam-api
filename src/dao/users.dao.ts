import { User, UserModel } from "../models/User";
import { RegisterUserDto } from '../dto/register.user.dto';
import { UserDto, createUserDto } from '../dto/user.dto';
import  { Op, where } from 'sequelize';
import { myHashCompare } from '../utility/helper';

import {Profile} from '../models/Profile';
import {Company} from '../models/Company';

class UsersDao{ 
     registerUser = async(registerUserDto: RegisterUserDto): Promise<number> => {      
       console.log(registerUserDto)
      const user: UserModel =  await User.create(registerUserDto, {
        include: [{
          association: User.hasOne(Profile),
          include: [ Profile.belongsTo(Company)]}        

      ]
      });
      
       /*Company.afterCreate( company => {        
         company.companyOwner =  user.id;
      })*/

      const name = registerUserDto.profile.company.name? registerUserDto.profile.company.name: registerUserDto.username
      const comp   = await Company.findOne({where:{name:name}});
      const newComp = comp?.toJSON();
      delete newComp['slug'];
      newComp.companyOwner = user.id;
      await Company.update(newComp, {where:{name:name}});
      
      return user.id;
    }

    isUserExistsById = async (id: string): Promise<boolean> => {
      const result: UserModel | null= await User.findByPk(id);
      return result? true: false;
    }

    getUserByEmailOrUsername = async(email: string, username: string): Promise<UserDto | null> => {
      const user: UserModel | null= await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
      return user? createUserDto(user.id, user.username, user.email, user.role): null;      
    }

    getUserById = async(id: string): Promise<UserDto | null> => {
      const user: UserModel | null= await User.findByPk(id);
      return user? createUserDto(user.id, user.username, user.email, user.role): null;      
    }

    verifyLogin = async(email: string, username: string, password: string): Promise<UserDto | null> => {
      const user: UserModel | null = await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
      if(user){
        if( myHashCompare(password, user.password)){
          return createUserDto(user.id, user.username, user.email, user.role)
          }else{
          return null  
     }
      }else{
          return null
      }
    }

    getUsers = async(page: number, limit: number): Promise<UserDto[]> => {
      const users: UserModel[] = await User.findAll({offset: page *limit | 0, limit:limit | 15});
      return users.map(user => createUserDto(user.id, user.username, user.email, user.role))
    }
 }

 export default new UsersDao();