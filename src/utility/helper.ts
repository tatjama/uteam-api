import { Request } from 'express';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import MyError from '../models/messages/MyError';

export const  slugify = (value1: string, value2:string): string => {
    return value1.toString().toLowerCase().trim()
    .replace(/\s+/g, '-') //replace spaces with -
    .replace(/&/g, '-and-')// replace & with and
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-')//Replace multiple - with single -
    + "_" + value2;
}

export const myHash = (value: string): string => {
    return bcryptjs.hashSync(value, 10);
}

export const myHashCompare = (hashedPassword: string, userPassword: string): boolean=> {
    return bcryptjs.compareSync(hashedPassword, userPassword)? true: false;
}

export const myValidationRegisterUserFields = (req: Request): MyError  => {
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

        return errors        
}

export const myValidationLoginUserFields = (req: Request): MyError => {
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
                req.body.email = 'email';
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

            }else{
                req.body.email = validator.trim(req.body.email);
                req.body.username = 'username';
                if(!validator.isEmail(req.body.email)){
                    errors.arrayError.push({ 
                        message: 'Invalid email format',
                        field: 'email',
                    });
                }
            }  
            
        }else{
            errors.arrayError.push({
                message: 'Must include username or email',
                field: 'username or email'           
            })
        }

        return errors
}