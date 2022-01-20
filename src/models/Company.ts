import { Model, DataTypes } from 'sequelize';
import {  sequelize } from '../instances/sequalize';
import { slugify } from '../utility/helper';
import MyError from './messages/MyError';

export interface CompanyModel extends Model {
    id: number;
    name: string;
    logo: string;
    slug: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export const Company = sequelize.define<CompanyModel>( 'Company', {
    id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    logo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    slug: {
        type: DataTypes.VIRTUAL,   
        unique: true,   
        get() {
          return slugify(this.name, this.id.toString()); 
        },
        set(value) {
          throw   new MyError( 'Error setter', 'Forbidden', 403, [{
            message: `Do not try to set the 'slug' value = ${value} !` ,
            field: 'slug'
        }] );
        }
      },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

})

Company.sync();