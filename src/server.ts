import  express, {  Application, Request, Response } from 'express';
import routes from './routes/messages';
import dotenv from 'dotenv';
import { User } from './models/User';

dotenv.config();

const app: Application = express();

/**Logging all users from db (table users) */
( async () =>  console.log(await User.findAll()))();  

/**Routes */
app.use('/', routes);

/**Error handlers */
app.use((req: Request, res: Response) => {
    const error = new Error('404 - Not found');
    res.status(404).json({ message: error.message })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started at port ' + PORT));