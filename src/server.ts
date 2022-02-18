import dotenv from 'dotenv';
dotenv.config();
import express, { Express, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import association from './models/associations';
import userRoutes from './routes/users.routes';
import profileRoutes from './routes/profile.routes';
import companyRoutes from './routes/companies.routes';
import MyError from './errors/MyError';
import errorHandler from './errors/error.middleware';
//import allRoutes from 'express-list-endpoints';

const app: Express = express();

/**Passport */
import './auth/passport/passport.strategies';

app.use(passport.initialize());

app.use(bodyParser.json());
  
association();

/**Routes */
app.use('/', userRoutes);
app.use('/profiles', profileRoutes);
app.use('/companies', companyRoutes);

//console.log( allRoutes(app));

/**Error handlers */
app.use((req: Request, res: Response, next: NextFunction): void => {
    const error: MyError = MyError.notFound('Route');
    error.arrayError.push({
        message: 'Page not found',
        field: 'route',
    })
    next(error);
})

app.use(errorHandler);

const PORT: number = Number(process.env.PORT) || 5000;

app.listen(PORT, () => console.log('Server started at port ' + PORT));
