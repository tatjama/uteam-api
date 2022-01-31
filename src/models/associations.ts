import {User} from './User';
import {Profile} from './Profile';
import {Company} from './Company';

const associations = () => {
    User.hasOne(Profile);
    User.hasMany(Company, {
        foreignKey: 'companyOwner'
    });
    //User.hasMany(Company);
    User.sync();
    Company.belongsTo(User, { foreignKey: 'companyOwner' });
    Company.hasMany(Profile);
    Profile.belongsTo(User);
    Profile.belongsTo(Company);

    
    Company.sync();
    Profile.sync();
}

export default associations;