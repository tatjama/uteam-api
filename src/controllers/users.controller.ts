import { NextFunction, Request, Response} from 'express';
import { UserDto } from '../dto/user.dto';
import UserService from '../services/user.service';
import { message } from '../utility/data';
import { internalError } from '../errors/errors/internal.errors';

const getMessage = async ( req: Request, res: Response, next: NextFunction): Promise< void > => {
    try {
        res.status(200).json(message);    
    } catch (error) {
        next(internalError());
    }    
}

const register = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const userId: number = await UserService.create(req.body);
        res.status(201).json({ message: `user id = ${userId}`});    
    } catch (error) {
        next(internalError());
    }    
}

const getUsers = async( req: Request, res: Response, next: NextFunction): Promise<void> => {
   try {
        const result: UserDto[]= await UserService.getUsers(0, 10);
        res.status(200).json(result);
   } catch (error) {
        next(internalError());
   }    
}

export default { getMessage, register, getUsers };
