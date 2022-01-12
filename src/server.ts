import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import  express, { Express, Request, Response } from 'express';
import userRoutes from './routes/users.routes';
import profileRoutes from './routes/profile.routes';
import allRoutes from 'express-list-endpoints';

const app: Express = express();
app.use(bodyParser.json());
  

/**Routes */
app.use('/', userRoutes);
app.use('/profiles', profileRoutes);

console.log( allRoutes(app));


/**Error handlers */
app.use((req: Request, res: Response): void => {
    const error: Error = new Error('404 - Not found');
    res.status(404).json(error.message);
})

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => console.log('Server started at port ' + PORT));
