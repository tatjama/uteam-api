import  express, {  Application, Request, Response } from 'express';
import routes from './routes/messages';
import dotenv from 'dotenv';
import { sequelize } from './instances/sequalize';
import { User } from './models/User';

dotenv.config();

const app: Application = express();

async function mySequalize(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

mySequalize();

User.findAll()
.then(x => console.log(x));

/*User.create({
  id: 18,
  username: 'user',
  email: 'user@example.com',
  password: 'password'
});*/



/**Routes */
app.use('/', routes);

/**Error handlers */
app.use((req: Request, res: Response) => {
    const error = new Error('404 - Not found');
    res.status(404).json({ message: error.message })
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started at port ' + PORT));