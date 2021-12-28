import { Model, DataTypes} from 'sequelize';
import { sequelize } from '../instances/sequalize';
export interface UserModel extends Model { 
    id: number;
    username: string;
    email: string;
    password: string;
}


export const User = sequelize.define<UserModel>('user', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {type : new DataTypes.STRING(128)},
    email: {type: new DataTypes.STRING(128)},
    password : {type: new DataTypes.STRING(128)}
}
)

/*class UserModel extends Model { 
    public id!: number;
    public username!: string;
    public email!: string;
    
    public password!: string
}

UserModel.init( {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    username: {type : new DataTypes.STRING(128)},
    emailL: {type: new DataTypes.STRING(128)},
    password : {type: new DataTypes.STRING(128)}
}, {tableName: 'users', sequelize}); */