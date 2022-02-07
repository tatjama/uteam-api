import { Request, Response, NextFunction } from "express";
import  UserService  from '../services/user.service';
import { UserDto } from '../dto/user.dto';
import validator from 'validator';
import MyError from "../models/messages/MyError";
class UsersMiddleware{      
    validateRegisterUserFieldsExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        (req.body && req.body.username && req.body.email && req.body.password)? next()
        : res.status(400).send({ error: 'Missing username, email or password' });
    }
    
     validateUserNoExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: UserDto | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );
        user? res.status(400).send( (new MyError( 'find user', 'validation', 400,[{
                                            message: 'User with that username or email already exists!',
                                            field: 'username or email'
                                        }]))): next();        
    }

        
     validatePassword = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: UserDto | null = await UserService.verifyLogin(req.body.email, req.body.username, req.body.password );        
        user? next(): res.status(403).send(new MyError( 'credential error ', 'validation', 400,[{
                                                 message: 'Credentials are invalid!',
                                                field: 'password'
                                            }]));
    }

    validateRegisterUserFields = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        req.body.username = validator.trim(req.body.username);
        req.body.email = validator.trim(req.body.email);
        req.body.password = validator.trim(req.body.password);
        const errors: MyError = new MyError('registration error', 'validation' ,400, []);
        if(!validator.isAlphanumeric(req.body.username, 'sr-RS@latin', {ignore: '%#*-_'})){
            errors.arrayError.push({
                message:'User name only excepts letters, numbers or %#*-_',
                field: 'username',
            });
        }
        if(!validator.isAlpha(req.body.username[0])){
            errors.arrayError.push({
                message: 'Username must start with a letter',
                field: 'username',
            });
        }
        if(!validator.isEmail(req.body.email)){
            errors.arrayError.push({ 
                message: 'Invalid email format',
                field: 'email',
            });
        }
        if(validator.isLength(req.body.password, {min: 0, max:5})){
            errors.arrayError.push({
                message: 'Must include password (min 6 characters)',
                field: 'password',
             });
        }

        errors.arrayError.length > 0? res.status(400).send(errors): next();
                
    }

    validateLoginUserFields = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        
        const errors: MyError = new MyError('login error', 'validation' ,400, []);
        if(req.body.password){
            req.body.password = validator.trim(req.body.password);
            if(validator.isLength(req.body.password, {min: 0, max:5})){
                errors.arrayError.push({
                    message: 'Must include password (min 6 characters)',
                    field: 'password',
                });
            }
        }else{
            errors.arrayError.push({
                message:'Must include a password',
                field: 'password',
            })
        }

        if(req.body.username || req.body.email){

            if(req.body.username){
                req.body.username = validator.trim(req.body.username);
                if(!validator.isAlphanumeric(req.body.username, 'sr-RS@latin', {ignore: '%#*-_'})){
                    errors.arrayError.push({
                        message:'User name only excepts letters, numbers or %#*-_',
                        field: 'username',
                    });
                }
                if(!validator.isAlpha(req.body.username[0])){
                    errors.arrayError.push({
                        message: 'Username must start with a letter',
                        field: 'username',
                    });
                }
                req.body.usernameField = req.body.username;
            }else{
                req.body.email = validator.trim(req.body.email);
                if(!validator.isEmail(req.body.email)){
                    errors.arrayError.push({ 
                        message: 'Invalid email format',
                        field: 'email',
                    });
                }
                req.body.usernameField = req.body.email;
            }  
            
        }else{
            errors.arrayError.push({
                message: 'Must include username or email',
                field: 'username or email'           
            })
        }

        
        errors.arrayError.length > 0? res.status(400).send(errors): next();

    }
    
}

export default new UsersMiddleware();