import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.MYSQL_DB || '';
const USERNAME = process.env.MYSQL_USERNAME || '';
const PASSWORD = process.env.MYSQL_PASSWORD || '';
const PORT = Number(process.env.MYSQL_PORT) || 3306;

export const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
    dialect: 'mysql',
    port: PORT ,
});

const mySequalize =  async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

mySequalize();





