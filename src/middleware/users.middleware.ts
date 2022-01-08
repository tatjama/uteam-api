import { Request, Response, NextFunction } from "express";
import  UserService  from '../services/user.service';
import bcryptjs from 'bcryptjs';
import { LoginUserDto } from "../dto/login.user.dto";
import { validationResult } from 'express-validator';
class UsersMiddleware{ 
     
    validateBodyFieldsErrors = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult( req);
        errors.isEmpty()? next(): res.status(400).send({ errors: errors.array() });
    }

     validateUserNoExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: LoginUserDto | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );
        user? res.status(400).send({ error: 'User with that username or email already exists' }): next();        
    }
    
     validatePassword = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: LoginUserDto | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );        
        if(user){ 
           if( bcryptjs.compareSync(req.body.password, user.password)){
                req.body.id = user.id;
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