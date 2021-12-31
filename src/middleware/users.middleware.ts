import { Request, Response, NextFunction } from "express";
import  UserService  from '../services/user.service';
import bcryptjs from 'bcryptjs';
import { RegisterUserDto } from "../dto/register.user.dto";
import { LoginUserDto } from "../dto/login.user.dto";
class UsersMiddleware{ 
     validateRegisterUserFieldsExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        if(req.body && req.body.username && req.body.email && req.body.password){
            next();
        }else{
            res.status(400).send({ error: 'Missing username, email or password' });
        }
    }

     validateSameUser = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: RegisterUserDto | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );
        if(user){
            res.status(400).send({ error: 'User with that username or email already exists' });
        }else{
            next();
        }
    }
    
     validatePassword = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: LoginUserDto | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );
        if(user){            
           if( bcryptjs.compareSync(req.body.password, user.password)){               
                next();
            }else{
                res.status(404).send({error: 'Invalid username or password'});
            }
        }else{
            res.status(400).send({ error: 'User with that username or email is not exists' });
        }
    }

    validateLoginUserFieldsExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        if(req.body && req.body.password){
            if(  req.body.username ){
                 req.body.email = '';
                next();
            }else{
                if( req.body.email){
                    req.body.username = '';
                    next();
                }else{
                    res.status(400).send({ error: 'Missing username, email or password' });        
                }
            }            
        }else{
            res.status(400).send({ error: 'Missing username, email or password' });
        }
    }
}

export default new UsersMiddleware();