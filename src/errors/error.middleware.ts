import {  Request, Response, NextFunction} from 'express';
import MyError from './MyError';

const errorHandler =  ( err: Error, req: Request, res: Response, next: NextFunction): void => {

    if(err instanceof MyError){
        res.status(err.codeError).send(err);
        return;
    }

    next({});
    
}

export default errorHandler;