import { Sequelize } from 'sequelize';


const DB: string = process.env.MYSQL_DB as string;
const USERNAME: string = process.env.MYSQL_USERNAME as string;
const PASSWORD: string = process.env.MYSQL_PASSWORD  as string;
const PORT: number = Number(process.env.MYSQL_PORT) || 3306;

export const sequelize = new Sequelize(DB, USERNAME, PASSWORD, {
    dialect: 'mysql',
    port: PORT ,
});

const mySequalize =  async ():Promise<void> => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

mySequalize();





