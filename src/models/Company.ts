import { Model, DataTypes } from 'sequelize';
import {  sequelize } from '../instances/sequalize';
import { Profile } from './Profile';

export interface CompanyModel extends Model {
    id: number;
    name: string;
    logo: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
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
    /*slug: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        set(value) {
            this.setDataValue('slug', value);
          },
        get() {
            const rawValue = this.getDataValue('slug');
            return rawValue ? rawValue.toUpperCase() : null;
          }
    },*/
    slug: {
        type: DataTypes.VIRTUAL,        
        get() {
          //return `${this.name} `;
          return this.name.toString().toLowerCase().trim()
          .replace(/\s+/g, '-') //replace spaces with -
          .replace(/&/g, '-and-')
          .replace(/[^\w-]+/g, '') // Remove all non-word chars
          .replace(/--+/g, '-'); //Replace multiple - with single -
        },
        set(value) {
          throw new Error('Do not try to set the `slug` value!');
        }
      },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

})

/*Profile.belongsTo(User);
User.hasOne(Profile);*/

//Company.hasMany(Profile);
//Profile.belongsTo(Company);
Company.sync();