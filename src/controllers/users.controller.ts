import { Request, Response} from 'express';
import { message } from '../utility/data';
import UserService from '../services/user.service';
import bcryptjs from 'bcryptjs';

const getMessage = async (req: Request, res: Response) => {
    const result = message;
    return res.status(200).json(result.message);
}

const login = async ( req: Request, res: Response) => {
    const jwtToken = "myJWTtoken";
    const result = {"message": message.message, "token": jwtToken};
    return res.status(200).json(result);
}

const register = async (req: Request, res: Response) => {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    const userId: number = await UserService.create(req.body);
    const result = { message: `user id = ${userId}`}
    return res.status(200).json(result);
}

export default { getMessage, login, register };