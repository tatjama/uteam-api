import { Model, DataTypes} from 'sequelize';
import { sequelize } from '../instances/sequalize';
import { Profile } from './Profile';
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
    }
}
);



//Profile.belongsTo(User, { as: 'user', foreignKey: 'userId' });
//Profile.belongsTo(User, { foreignKey: 'userId' });
//User.hasOne(Profile);

User.sync();