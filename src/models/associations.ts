import { User } from './User';
import { Profile } from './Profile';
import { Company } from './Company';
import { sequelize} from '../instances/sequalize';

const associations = async() => {
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

    await sequelize.sync(); 
}

export default associations;