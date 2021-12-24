import { Request, Response} from 'express';
import { message } from '../utility/data';

const getMessage = (req: Request, res: Response) => {
    const result = message;
    return res.status(200).json(result.message);
}


export default { getMessage };