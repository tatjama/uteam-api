import { Model, DataTypes } from 'sequelize';
import {  sequelize } from '../instances/sequalize';
import { User, UserModel } from './User';

export enum StatusEnumValue{ 
    PENDING = 'pending' ,
    PUBLISHED = 'published' 
}

export interface ProfileModel extends Model {
    id: number;
    name: string;
    profilePhoto: string;
    status: StatusEnumValue;
    user: UserModel;
}

export const Profile = sequelize.define<ProfileModel>( 'Profile', {
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    profilePhoto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM({values: Object.keys(StatusEnumValue)}),
        allowNull: false
    }
})

Profile.belongsTo(User);
//User.hasOne(Profile)//, {as: 'profile', foreignKey: 'userId'});
//Profile.belongsTo(User, { as: 'user', foreignKey: 'userId', targetKey: 'id' });
//Profile.belongsTo(User, { foreignKey: 'userId' });
//User.hasOne(Profile);
Profile.sync();

