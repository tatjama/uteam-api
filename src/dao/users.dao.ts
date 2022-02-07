
import  { Op} from 'sequelize';
import { User, UserModel } from "../models/User";
import { RegisterUserDto } from '../dto/register.user.dto';
import { UserDto, createUserDto } from '../dto/user.dto';
import {Profile} from '../models/Profile';
import {Company} from '../models/Company';
import { sequelize } from '../instances/sequalize';
import { myHashCompare } from '../utility/helper';

class UsersDao{ 
     registerUser = async(registerUserDto: RegisterUserDto): Promise<number> => { 
      const name = registerUserDto.profile.company.name;
      User.addHook('afterCreate', async (user, options) => {
        await Company.update({ name, companyOwner: user.getDataValue('id') }, {
          where: { name },
          transaction: options.transaction
        });
      });
      
      const newUser = await sequelize.transaction(async t => {
        return await User.create(registerUserDto,  {
          include: [{
            association: User.hasOne(Profile),
            include: [ Profile.belongsTo(Company)]}          
        ],
          transaction: t
        });        
      }); 
      
      return newUser.id;

    }

    isUserExistsById = async (id: string): Promise<boolean> => {
      const result: UserModel | null= await User.findByPk(id);
      return result? true: false;
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