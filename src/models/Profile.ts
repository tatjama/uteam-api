import { Model, DataTypes } from 'sequelize';
import {  sequelize } from '../instances/sequalize';

export enum StatusEnumValue{ 
    PENDING = 'pending' ,
    PUBLISHED = 'published' 
}

export interface ProfileModel extends Model {
    id: number;
    name: string;
    profilePhoto: string;
    status: StatusEnumValue;
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
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM({values: Object.keys(StatusEnumValue)}),
        allowNull: false,
        defaultValue: StatusEnumValue.PENDING,
    }
})
