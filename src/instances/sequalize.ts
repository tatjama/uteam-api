import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.MYSQL_DB || '';
const USERNAME = process.env.MYSQL_USERNAME || '';
const PASSWORD = process.env.MYSQL_PASSWORD || '';

export const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
    dialect: 'mysql',
    port: 3306
});

//sequelize.authenticate();

