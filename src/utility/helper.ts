import { Request } from 'express';
import bcryptjs from 'bcryptjs';
import validator from 'validator';
import MyError  from '../models/messages/MyError';

//Slugify
export const  slugify = (value1: string): string => {
    return value1.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') //replace spaces with -
    .replace(/--+/g, '-')//Replace multiple - with single -
    ;
}

//Hash
export const myHash = (value: string): string => {
    return bcryptjs.hashSync(value, 10);
}

export const myHashCompare = ( userPassword: string, hashedPassword: string): boolean=> {
    return bcryptjs.compareSync( userPassword, hashedPassword)? true: false;
}

//Start USER validation
export const userFieldsValidation = (req: Request): MyError => {    
    const errors: MyError = new MyError('registration error', 'validation' ,400, []);

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
    }

    if(req.body.email){
        req.body.email = validator.trim(req.body.email);
        if(!validator.isEmail(req.body.email)){
            errors.arrayError.push({ 
                message: 'Invalid email format',
                field: 'email',
            });
        }
    }
    
    if(req.body.password){
        req.body.password = validator.trim(req.body.password);
        if(validator.isLength(req.body.password, {min: 0, max:5})){
            errors.arrayError.push({
                message: 'Must include password (min 6 characters)',
                field: 'password',
             });         
        }
    }
    
    return errors;
}

export const loginUserFieldsExistsValidation = (req: Request): MyError => {
    const errors: MyError = new MyError('registration error', 'validation' ,400, []);   
        if(!req.body.password){
            errors.arrayError.push({
                message:'Must include a password',
                field: 'password',
            })
        }        
        
        if(!req.body.username && !req.body.email){
            errors.arrayError.push({
                message: 'Must include username or email',
                field: 'username or email'           
            })
        }
                    
        
        return errors;
}
//End USER validations

//Start PROFILE validations
export const profileFieldsValidation = (name: string, profilePhoto: string) => {    
    const errors: MyError = new MyError( 'error create profile', 'validation', 400, [] );
    if(name){
        name = validator.trim(name);
        if(!validator.isAlphanumeric(name)){
            errors.arrayError.push({
                message: 'Name only excepts letters and numbers',
                field: 'Profile name'
            });
        }
    } 

    if(profilePhoto){
        profilePhoto = validator.trim(profilePhoto);
        if(!validator.isURL(profilePhoto)){
            errors.arrayError.push({
                message: 'Profile Photo must be url',
                field: 'profilePhoto'
            })
        }    
    }         

    /*if(req.body.companyId){
        const company: CompanyDto | null= await CompanyService.getCompanyById(req.body.companyId);
        if(!company){
            errors.arrayError.push({
                message: 'company with that ID does not exist!',
                field: 'company id '
            })
        }
    }*/

   return {errors, name, profilePhoto};
}

//End PROFILE validations

//Start COMPANY validations
export const companyFieldsValidation = (name: string, logo: string) => {
    const errors: MyError = new MyError( 'error create company', 'validation', 400, [] );
    if(name){
        name = validator.trim(name);
        if(!validator.isAlphanumeric(name, 'en-US', {ignore: "%#*- '"})){
            errors.arrayError.push({
                message: 'Name only excepts letters, numbers and "%#*- \'" characters',
                field: 'Company name'
            });
        }
    } 
    
    if(logo){
        logo = validator.trim(logo);
        if(!validator.isURL(logo)){
            errors.arrayError.push({
                message: 'logo must be url',
                field: 'Company logo'
            })
        }
    }
    
    return {errors, name, logo};
}

//End Company validations