import  express, { Request, Response } from 'express';

const app = express();

app.get('/*', (req: Request, res: Response) => {
    res.json({
        "message": 'ok'
    });
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log('Server started at port ' + PORT));