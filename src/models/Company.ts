import { Model, DataTypes } from 'sequelize';
import {  sequelize } from '../instances/sequalize';
import { slugify } from '../utility/helper';
import MyError from './messages/MyError';
import { Profile } from './Profile';

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
      companyOwner: {
        type: DataTypes.INTEGER.UNSIGNED,
        unique: true,
        //allowNull: false,
        references: {
          model: User, // Can be both a string representing the table name or a Sequelize model
          key: 'id'
        }
      },
      /*companyOwner: {
        allowNull: false,
        field: "companyOwner",
        references: {
          model: "User",
          key: "UserId",
        },
        type: DataTypes.INTEGER,
      },*/
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },

});


/*User.hasOne(Profile);
User.hasMany(Company, {
    foreignKey: 'companyOwner'
});
Company.hasMany(Profile);
Profile.belongsTo(User);
Profile.belongsTo(Company);
*/

/*Company.belongsTo(User, {
    foreignKey: 'companyOwner'
})*/

/*User.hasMany(Company, {
    foreignKey: 'companyOwner'
});
Company.belongsTo(User);*/
/*User.sync();
Company.sync();
Profile.sync();
*/