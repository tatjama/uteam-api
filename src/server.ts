import  express, {  Application, NextFunction, Request, Response } from 'express';
import routes from './routes/messages';

const app: Application = express();

/**Routes */
app.use('/', routes);

/**Error handlers */
app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('404 - Not found');
    res.status(404).json({ message: error.message });
})


const PORT: any = process.env.PORT || 5000;

app.listen(PORT, () => console.log('Server started at port ' + PORT));