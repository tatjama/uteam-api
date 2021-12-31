
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import  express, {  Application, Request, Response } from 'express';
import routes from './routes/users.routes';
import { User } from './models/User';

const app: Application = express();
app.use(bodyParser.json());

/**Logging all users from db (table users) */
( async () =>  console.log(await User.findAll()))();
  
/**Routes */
app.use('/', routes);
app.use('/login', routes);
app.use('/register', routes);

/**Error handlers */
app.use((req: Request, res: Response) => {
    const error = new Error('404 - Not found');
    res.status(404).json({ message: error.message })
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log('Server started at port ' + PORT));