import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import  express, { Express, Request, Response } from 'express';
import userRoutes from './routes/users.routes';
import profileRoutes from './routes/profile.routes';
import companyRoutes from './routes/companies.routes';
//import allRoutes from 'express-list-endpoints';

const app: Express = express();
app.use(bodyParser.json());
  

/**Routes */
app.use('/', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/companies', companyRoutes);

//console.log( allRoutes(app));


/**Error handlers */
app.use((req: Request, res: Response): void => {
    const error: Error = new Error('404 - Not found');
    res.status(404).json(error.message);
})

const PORT: number = Number(process.env.PORT) || 5002;

app.listen(PORT, () => console.log('Server started at port ' + PORT));
//TODO LIST:
/**
 * TODO - password to hash at model User setter
 * TODO - at create Profile add optional field CompanyId
 * TODO - at putProfile add optional field CompanyId 
 * TODO - updateProfile change input parameters to RegisterProfileDto and id like in company
 * TODO - add profiles in CompanyDto Model and
 * TODO -  foreignKey UserId at Profile not null 
 * TODO - foreignKey CompanyId at Profile allow null
 * TODO - Check is user with Id Exist and Company with Id Exist on create profile
 */