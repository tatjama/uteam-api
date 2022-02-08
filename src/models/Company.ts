import { Model, DataTypes } from 'sequelize';
import {  sequelize } from '../instances/sequalize';
import { slugify } from '../utility/helper';
import MyError from './messages/MyError';

import { User } from './User';
export interface CompanyModel extends Model {
    id: number;
    name: string;
    logo: string;
    slug: string;
    companyOwner: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}

export const Company = sequelize.define<CompanyModel>( 'company', {
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
        allowNull: false,
        defaultValue:"https://upload.wikimedia.org/wikipedia/commons/d/d1/Identicon.svg"
    },
    slug: {
        type: DataTypes.VIRTUAL,   
        unique: true,   
        get() {
          return this.name && slugify(this.name); 
        },
        set(value) {
          throw   new MyError( 'Error setter', 'Forbidden', 403, [{
            message: `Do not try to set the 'slug' value = ${value} !` ,
            field: 'slug'
        }] );
        }
      },
      companyOwner: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: User, // Can be both a string representing the table name or a Sequelize model
          key: 'id',
          
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

});

