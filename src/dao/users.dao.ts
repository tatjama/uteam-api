
import { Op } from 'sequelize';
import { User, UserModel } from "../models/User";
import { RegisterUserDto } from '../dto/register.user.dto';
import { UserDto, createUserDto } from '../dto/user.dto';
import { Profile } from '../models/Profile';
import { Company } from '../models/Company';
import { sequelize } from '../instances/sequalize';

class UsersDao{ 
     registerUser = async ( registerUserDto: RegisterUserDto ): Promise<number> => { 
        const name = registerUserDto.profile.company.name;
        User.addHook( 'afterCreate', 'registerHook', async ( user, options ) => {
        await Company.update({ name, companyOwner: user.getDataValue( 'id' ) }, {
          where: { name },
          transaction: options.transaction
        });
      });
      
      const newUser = await sequelize.transaction( async t => {
        return await User.create(registerUserDto,  {
          include: [{
            association: User.hasOne( Profile ),
            include: [ Profile.belongsTo( Company )]}          
        ],
          transaction: t
        });        
      }); 
      User.removeHook('afterCreate', 'registerHook');
      return newUser.id;

    }

    isUserExistsById = async ( id: string ): Promise<boolean> => {
      const result: UserModel | null = await User.findByPk( id );
      return result? true: false;
    }

    getUserById = async( id: string ): Promise<UserDto | null> => {
      const user: UserModel | null = await User.findByPk( id );
      return user? createUserDto( user.id, user.username, user.email, user.role ): null;      
    }

    getUserIdByUsername = async (username: string): Promise<number | null> => {
      const user: UserModel | null = await User.findOne({ where: { username: username}});
      return user? user.id: null;
    }

    getUserByEmailOrUsername = async(email: string, username: string): Promise<UserDto | null> => {
      const user: UserModel | null= await User.findOne({ where: {[Op.or]:[{ email: email },{ username: username }] } });
      return user? createUserDto(user.id, user.username, user.email, user.role): null;      
    }

    getUsers = async(page: number, limit: number): Promise<UserDto[]> => {
      const users: UserModel[] = await User.findAll({offset: page *limit | 0, limit:limit | 15});
      return users.map(user => createUserDto(user.id, user.username, user.email, user.role))
    }
 }

 export default new UsersDao();