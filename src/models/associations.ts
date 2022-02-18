import {User} from './User';
import {Profile} from './Profile';
import {Company} from './Company';

const associations = () => {
    User.hasOne(Profile );
    User.hasMany(Company, {
        foreignKey: 'companyOwner'
    });    
    Company.belongsTo(User, { 
        foreignKey: 'companyOwner' 
    });
    Company.hasMany(Profile);
    Profile.belongsTo(User);
    Profile.belongsTo(Company);

    User.sync();
    Company.sync();
    Profile.sync();
}

export default associations;