import { Request, Response, NextFunction } from "express";
import { UserDto } from '../dto/user.dto';
import { ReqUser } from '../dto/register.user.dto';
import  UserService  from '../services/user.service';
import MyError from "../errors/MyError";
import { userFieldsValidation, loginUserFieldsExistsValidation } from '../utility/validations';
import { extractUserIdFromJWTError, findUserFromJWTError, validateUserNoExistsError, 
    validateRegisterUserFieldsExistsError } from '../errors/errors/user.errors';
class UsersMiddleware{  
    extractUserIdFromJWT = async (req: ReqUser, res: Response, next: NextFunction): Promise<void> => {
        if(req.user?.username){
            const userId: number | null= await UserService.findByUsername(req.user.username);
            if(userId){
                req.body.userId = userId;
                req.body.companyOwner = userId;
                next();
            }else{
                next(findUserFromJWTError());
            }
        }else{
            next(extractUserIdFromJWTError());
        }         
    }
    
    validateUserNoExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const user: UserDto | null = await UserService.findByEmailOrUsername(req.body.email, req.body.username );
        user? next(validateUserNoExistsError()): next();        
    }

     
    validateRegisterUserFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors: MyError  = userFieldsValidation(req);
        errors.arrayError.length > 0? next(errors): next();                
    }


    validateRegisterUserFieldsExist = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        (req.body && req.body.username && req.body.email && req.body.password)? next()
        : next(validateRegisterUserFieldsExistsError());
    }

    validateLoginUserFieldsExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors: MyError  = loginUserFieldsExistsValidation(req);
        errors.arrayError.length > 0? next(errors): next();                
    
    }
    
     
    validateLoginUserFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const errors: MyError = userFieldsValidation(req);  
        if(req.body.username){
            req.body.usernameField = req.body.username;
        }else{
            req.body.usernameField = req.body.email;        
        }
        errors.arrayError.length > 0? next(errors): next();
    }
    
}

export default new UsersMiddleware();