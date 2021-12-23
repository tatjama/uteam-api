import { Request, Response, NextFunction } from 'express';
import { message } from '../utility/data';

const getMessage = (req: Request, res: Response, next: NextFunction) => {
    let result = message;
    return res.status(200).json(result.message);
}


export default { getMessage };