import { Request, Response, NextFunction } from "express";
import  UserService  from '../services/user.service';
import { validationResult } from 'express-validator';
import { UserDto } from '../dto/user.dto';
class UsersMiddleware{ 
     
    validateBodyFieldsErrors = (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult( req);
        errors.isEmpty()? next(): res.status(400).send({ errors: errors.array() });
    }

     validateUserNoExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: UserDto | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );
        user? res.status(400).send({ error: 'User with that username or email already exists' }): next();        
    }
    
     validatePassword = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: UserDto | null = await UserService.verifyLogin(req.body.email, req.body.username, req.body.password );        
        if(user){ 
          next();           
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