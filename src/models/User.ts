import { Model, DataTypes} from 'sequelize';
import { sequelize } from '../instances/sequalize';
import { myHash } from '../utility/helper';

export enum RoleEnumValue{ 
    COMPANY_USER = 'company_user' ,
    COMPANY_ADMIN = 'company_admin',
    SUPERADMIN = 'superadmin' 
}
export interface UserModel extends Model { 
    id: number;
    username: string;
    email: string;
    password: string;
    role: RoleEnumValue;
}

export const User = sequelize.define<UserModel>('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    username: {
        type : DataTypes.STRING(128),
        unique: true,
        allowNull: false
    },
    
    email: {
        type: DataTypes.STRING(128),
        unique: true,
        allowNull: false
    },
    /*password : {
        type: DataTypes.STRING(128),
        allowNull: false
    },*/
    password: {
        type: DataTypes.STRING,
        set(value: string) {
          this.setDataValue('password', myHash(value));
        }
      },
    role: {
        type: DataTypes.ENUM({values: Object.keys(RoleEnumValue)}),
        allowNull: false,
        defaultValue: RoleEnumValue.COMPANY_USER,
    }
}
);

//User.sync();

/* User.create({
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
      association: User.Profile,
      include: [ User.Company ]
    }]
  });*/