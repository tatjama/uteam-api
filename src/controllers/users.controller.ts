import { Request, Response} from 'express';
import { message } from '../utility/data';
import UserService from '../services/user.service';
import bcryptjs from 'bcryptjs';
import AuthController, { AuthResponse } from '../auth/auth.jwt';
import Message from '../models/messages/Message';
import MessageLogin from '../models/messages/MessageLogin';
import { UserDto } from '../dto/user.dto';
import { RoleEnumValue } from '../models/User';

const getMessage = async (req: Request, res: Response):Promise<Response<Message>> => {
    return res.status(200).json(message);
}

const login = async ( req: Request, res: Response): Promise<Response<MessageLogin>> => {
    const jwtToken: AuthResponse =  AuthController.createJWT(req);
    return res.status(200).json({message: message.message, token: jwtToken});
}

const register = async (req: Request, res: Response): Promise<Response<Message>> => {
    req.body.role = RoleEnumValue.COMPANY_USER;
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
    const userId: number = await UserService.create(req.body);
    return res.status(201).json({ message: `user id = ${userId}`});
}

const getUsers = async( req: Request, res: Response): Promise<Response<UserDto[]>> => {
    const result: UserDto[]= await UserService.getUsers(0, 10);
    return res.status(200).json(result);
}

export default { getMessage, login, register, getUsers };
