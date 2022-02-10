import { Request, Response, NextFunction } from "express";
import { UserDto } from '../dto/user.dto';
import { ReqUser } from '../dto/register.user.dto';
import  UserService  from '../services/user.service';
import MyError from "../models/messages/MyError";
import { userFieldsValidation, loginUserFieldsExistsValidation } from '../utility/helper';
class UsersMiddleware{  
    extractUserIdFromJWT = async (req: ReqUser, res: Response, next: NextFunction): Promise<void> => {
        if(req.user?.username){
            const userId: number | null= await UserService.findByUsername(req.user.username);
            if(userId){
                req.body.userId = userId;
                req.body.companyOwner = userId;
                next();
            }else{
                res.status(400).send( (new MyError( 'find user by username', 'extract JWT', 400,[{
                    message: 'User with that username does not exists!',
                    field: 'userId'
                }])))
            }
        }else{
            res.status(400).send( (new MyError( 'find user by username', 'extract JWT', 400,[{
                message: 'There is no username at JWT payload!',
                field: 'JWT payload'
            }])))
        }         
    }
    
    validateUserNoExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: UserDto | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );
        user? res.status(400).send( (new MyError( 'find user', 'validation', 400,[{
                                            message: 'User with that username or email already exists!',
                                            field: 'username or email'
                                        }]))): next();        
    }

     
    validateRegisterUserFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors: MyError  = userFieldsValidation(req);
        errors.arrayError.length > 0? res.status(400).send(errors): next();                
    }


    validateRegisterUserFieldsExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        (req.body && req.body.username && req.body.email && req.body.password)? next()
        : res.status(400).send((new MyError( 'register user fields exists', 'validation', 400,[{
            message: 'Missing username, email or password',
            field: 'username, email or password'
        }])));
    }

    validateLoginUserFieldsExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors: MyError  = loginUserFieldsExistsValidation(req);
        errors.arrayError.length > 0? res.status(400).send(errors): next();                
    
    }
    
     
    validateLoginUserFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors: MyError = userFieldsValidation(req);  
        if(req.body.username){
            req.body.usernameField = req.body.username;
        }else{
            req.body.usernameField = req.body.email;        
        }
        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }
    
}

export default new UsersMiddleware();