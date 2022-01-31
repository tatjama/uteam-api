import { User, UserModel, RoleEnumValue } from "../models/User";
import { RegisterUserDto } from '../dto/register.user.dto';
import { UserDto, createUserDto } from '../dto/user.dto';
import  { Op } from 'sequelize';
import { myHashCompare } from '../utility/helper';

import {Profile, StatusEnumValue} from '../models/Profile';
import {Company} from '../models/Company';
import model from "sequelize/dist/lib/model";

class UsersDao{ 
     registerUser = async(registerUserDto: RegisterUserDto): Promise<number> => {
      /* const fullUser = await  User.create({
        username: "tanja120a",
        email: "tanja120a@gmail.com",
        password: "password",
        role: RoleEnumValue.COMPANY_USER,
        Profile: {
            name: "Tanja",
            profilePhoto: "http://google.com",
            status: StatusEnumValue.PENDING,
          Company: {
            name: "Tanja's company",
            logo: "http://google.com"
          }
        }
      }, {
        include: [{
          association: User.hasOne(Profile),
          include: [ Profile.belongsTo(Company) ]
        }]
      });
      return fullUser.id;*/
      const user: UserModel =  await User.create(registerUserDto, {
        include: [{
          association: User.hasOne(Profile),
          include: [ Profile.belongsTo(Company), User.hasMany(Company), 
            Company.belongsTo(User), Company.hasMany(Profile), Profile.belongsTo(User) 
          ]},
        {
          association:Company.belongsTo(User),
        include:[User.hasMany(Company, {
          foreignKey: {name:'companyOwner'}
      })]
        },]
      });  
      
    
  /*    const user: UserModel = await User.create(registerUserDto, {
        include:[{model: Company}, {model: Profile}]
      })   
      */ 
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
        //if( bcryptjs.compareSync(password, user.password)){
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