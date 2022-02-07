import { Request, Response} from 'express';
import { message } from '../utility/data';
import UserService from '../services/user.service';
import Message from '../models/messages/Message';
import { UserDto } from '../dto/user.dto';

const getMessage = async (req: Request, res: Response):Promise<Response<Message>> => {
    return res.status(200).json(message);
}

const register = async (req: Request, res: Response): Promise<Response<Message>> => {
    const userId: number = await UserService.create(req.body);
    return res.status(201).json({ message: `user id = ${userId}`});
}

const getUsers = async( req: Request, res: Response): Promise<Response<UserDto[]>> => {
    const result: UserDto[]= await UserService.getUsers(0, 10);
    return res.status(200).json(result);
}

export default { getMessage, register, getUsers };
