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
        allowNull: false
    },
    username: {
        type : new DataTypes.STRING(128),
        unique: true,
        allowNull: false
    },
    email: {
        type: new DataTypes.STRING(128),
        unique: true,
        allowNull: false
    },
    password : {
        type: new DataTypes.STRING(128),
        allowNull: false
    }
}
);

User.sync();
Profile.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });
//Profile.belongsTo(User, { as: 'user', foreignKey: 'userId' });
//Profile.belongsTo(User, { foreignKey: 'userId' });
//User.hasOne(Profile);
User.hasOne(Profile)//, {as: 'profile', foreignKey: 'userId'});