import { Request, Response, NextFunction } from "express";
import { UserModel } from '../models/User';
import  UserService  from '../services/user.service';

class UsersMiddleware{ 
    async validateRegisterUserFieldsExist(req: Request, res: Response, next: NextFunction): Promise<void>{
        if(req.body && req.body.username && req.body.email && req.body.password){
            next();
        }else{
            //Bad Request
            res.status(400).send({ error: 'Missing username, email or password' });
        }
    }

    async validateSameUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        const user: UserModel | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );
        if(user){
            res.status(400).send({ error: 'User with that username or email already exists' });
        }else{
            next();
        }
    }

}

export default new UsersMiddleware();