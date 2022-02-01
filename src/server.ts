import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import  express, { Express, Request, Response } from 'express';
import userRoutes from './routes/users.routes';
import profileRoutes from './routes/profile.routes';
import companyRoutes from './routes/companies.routes';
//import allRoutes from 'express-list-endpoints';

import association from './models/associations';

const app: Express = express();
app.use(bodyParser.json());
  
association();

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

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => console.log('Server started at port ' + PORT));
