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

// USER validation
export const registerUserFieldsValidation = (req: Request): MyError => {    
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

export const loginUserFieldsValidation = (req: Request): MyError => {
    const errors: MyError = registerUserFieldsValidation(req);
        if(!req.body.password){
            errors.arrayError.push({
                message:'Must include a password',
                field: 'password',
            })
        }

        if(!req.body.username || !req.body.email){
            errors.arrayError.push({
                message: 'Must include username or email',
                field: 'username or email'           
            })
        }

        return errors;
}

//PROFILE validation
export const profileEditFieldsValidation = (req:Request): MyError => {    
    const errors: MyError = new MyError( 'error create profile', 'validation', 400, [] );
    if(req.body.name){
        req.body.name = validator.trim(req.body.name);
        if(!validator.isAlphanumeric(req.body.name)){
            errors.arrayError.push({
                message: 'Name only excepts letters and numbers',
                field: 'Profile name'
            });
        }
    } 

    if(req.body.profilePhoto){
        req.body.profilePhoto = validator.trim(req.body.profilePhoto);
        if(!validator.isURL(req.body.profilePhoto)){
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

   return errors;
}

export const profileFieldsValidation = (req: Request): MyError => {
    const errors: MyError = profileEditFieldsValidation(req);
        if(!req.body.name) {
            errors.arrayError.push({
                message: 'Missing required field',
                field: 'Profile name'
            });
        } 
    
        return errors;
}
export const profileFieldsExistsValidation = (req: Request): MyError => {
    const errors: MyError = new MyError( 'error create profile', 'validation', 400, [] );
    if(req.body.profile.name){
        req.body.profile.name = validator.trim(req.body.profile.name);
        if(!validator.isAlphanumeric(req.body.profile.name)){
            errors.arrayError.push({
                message: 'Name only excepts letters and numbers',
                field: 'Profile name'
            });
        }
    } 

    if(req.body.profile.profilePhoto){
        req.body.profile.profilePhoto = validator.trim(req.body.profile.profilePhoto);
        if(!validator.isURL(req.body.profile.profilePhoto)){
            errors.arrayError.push({
                message: 'Profile Photo must be url',
                field: 'profilePhoto'
            })
        }    
    }
    //const errors: MyError = profileEditFieldsValidation(req);
        if(!req.body.profile.name) {
            errors.arrayError.push({
                message: 'Missing required field',
                field: 'Profile name'
            });
        } 
    
        return errors;
}

//COMPANY validation
export const companyFieldsValidation = (req: Request): MyError => {
    const errors: MyError = new MyError( 'error create company', 'validation', 400, [] );
    if(req.body.name){
        req.body.name = validator.trim(req.body.name);
        if(!validator.isAlphanumeric(req.body.name, 'en-US', {ignore: "%#*- '"})){
            errors.arrayError.push({
                message: 'Name only excepts letters, numbers and "%#*- \'" characters',
                field: 'Company name'
            });
        }
    } 

    if(req.body.logo){
        req.body.logo = validator.trim(req.body.logo);
        if(!validator.isURL(req.body.logo)){
            errors.arrayError.push({
                message: 'logo must be url',
                field: 'Company logo'
            })
        }
    }
    
    return errors;
}

export const companyEditFieldsValidation = (req: Request): MyError => {
    const errors: MyError = new MyError( 'error create company', 'validation', 400, [] );
    if(req.body.profile.company.name){
        req.body.profile.company.name = validator.trim(req.body.profile.company.name);

        if(!validator.isAlphanumeric(req.body.profile.company.name, 'en-US', {ignore: "%#*- '"})){
            errors.arrayError.push({
                message: 'Name only excepts letters, numbers and "%#*- \'" characters',
                field: 'Company name'
            });
        }        
    } 

    if(req.body.profile.company.logo){
        req.body.profile.company.logo = validator.trim(req.body.profile.company.logo);
        if(!validator.isURL(req.body.profile.company.logo)){
            errors.arrayError.push({
                message: 'logo must be url',
                field: 'Company logo'
            })
        }
    }
    
    return errors;
}