import { Model, DataTypes} from 'sequelize';
import { sequelize } from '../instances/sequalize';

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
    password : {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM({values: Object.keys(RoleEnumValue)}),
        allowNull: false
    }
}
);

User.sync();