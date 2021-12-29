import { Model, DataTypes} from 'sequelize';
import { sequelize } from '../instances/sequalize';
export interface UserModel extends Model { 
    id: number;
    username: string;
    email: string;
    password: string;
}

export const User = sequelize.define<UserModel>('User', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type : new DataTypes.STRING(128),
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false
    },
    password : {
        type: new DataTypes.STRING(128),
        allowNull: false
    }
}
)

