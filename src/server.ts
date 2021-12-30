
import bodyParser from 'body-parser';
import  express, {  Application, Request, Response } from 'express';
import routes from './routes/users.routes';
import dotenv from 'dotenv';
import { User } from './models/User';

dotenv.config();


const app: Application = express();
app.use(bodyParser.json());

/**Logging all users from db (table users) */

/*async function createUser(){
   await  User.create({
        username: 'user3',
        email: 'user@example.com',
        password: 'password'
    });

}
createUser();*/

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