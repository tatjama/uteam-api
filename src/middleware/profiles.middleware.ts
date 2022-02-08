import { Request, Response, NextFunction} from 'express';
import validator from 'validator';
import { ReqUser } from '../dto/register.user.dto';
import { ProfileDto } from '../dto/profile.dto';
import { CompanyDto } from '../dto/company.dto';
import ProfileService from '../services/profile.service';
import CompanyService from '../services/company.service';
import MyError from '../models/messages/MyError';
class ProfilesMiddleware{
    extractProfileId = (req: Request, res: Response, next: NextFunction) => {
        req.body.id = req.params.id;
        next();
    }

    isProfileNoExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const isProfileExist: boolean = await ProfileService.isProfileExistByUserId(req.body.userId);
        isProfileExist? res.status(400).send( new MyError ('find profile', 'validation', 400,[{
                                            message: 'profile for that user already exists!',
                                            field: 'UserId '
                                        }])): next();
    }

    isProfileNameExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if(req.body.name){
            const isProfileNameExists: boolean = await ProfileService.isProfileNameExists(req.body.name);
            isProfileNameExists? res.status(400).send( new MyError ('find profile', 'validation', 400,[{
                                                    message: 'Profile name exists.Please change profile name',
                                                    field: 'profile name '
                                        }])): next();
        }else{
            if(req.body.profilePhoto){
                next();
            }else{
                res.status(400).send( new MyError (' profile', 'validation', 400,[{
                    message: 'Input fields are empty! You must provide at least one input field.',
                    field: 'profile name and profile Photo '
        }]))
            }
            
        }
        
    }


    // CASE - NAME AND PHOTO URL ARE REQUIRED
    //If all fields are NOT required remove function and call validateProfileEditFields
    

    validateProfileFields = async (req: ReqUser, res: Response, next: NextFunction): Promise<void> => {
        
        const errors: MyError = new MyError( 'error create profile', 'validation', 400, [] );
        
        if(req.body.name){
            req.body.name = validator.trim(req.body.name);
        } else {
            req.body.name = '';
            errors.arrayError.push({
                message: 'Missing required field',
                field: 'name'
            });
        } 

        if(req.body.profilePhoto){
            req.body.profilePhoto = validator.trim(req.body.profilePhoto)
        } else {
            req.body.profilePhoto = '';
            errors.arrayError.push({
                message: 'Missing required field',
                field: 'profile photo'
            });
        } 

        if(!validator.isAlphanumeric(req.body.name)){
            errors.arrayError.push({
                message: 'Name only excepts letters and numbers',
                field: 'name'
            });
        }

        if(!validator.isURL(req.body.profilePhoto)){
            errors.arrayError.push({
                message: 'Profile Photo must be url',
                field: 'profilePhoto'
            })
        }

        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }

    // CASE - NAME AND PHOTO URL ARE NOT REQUIRED
    //If all fields are required remove function and call validateProfile Fields
    
    validateProfileEditFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        
        const errors: MyError = new MyError( 'error create profile', 'validation', 400, [] );

        if(req.body.name){
            req.body.name = validator.trim(req.body.name);
            if(!validator.isAlphanumeric(req.body.name)){
                errors.arrayError.push({
                    message: 'Name only excepts letters and numbers',
                    field: 'name'
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

        if(req.body.CompanyId){
            const company: CompanyDto | null= await CompanyService.getCompanyById(req.body.CompanyId);
            if(!company){
                errors.arrayError.push({
                    message: 'company with that ID does not exist!',
                    field: 'company id '
                })
            }
        }
       
        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }

    

    validateProfileExists = async (req: Request, res: Response, next: NextFunction) => {
        const profile: ProfileDto | null= await ProfileService.getProfileById(req.body.id);
        if(profile){
            res.locals.profile = profile;
            next();
        }else{
            res.status(404).send(new MyError( 'Error Not found', 'validation', 404,[{
                message: 'profile with that ID does not exist!',
                field: 'profile id '
            }]))
        }
    }

    // Validate profile fields when register
    validateProfileFieldsExist =  async (req: Request, res: Response, next: NextFunction) => {
        const errors: MyError = new MyError( 'error create profile', 'validation', 400, [] );
        if(req.body.profile.name){
            req.body.profile.name = validator.trim(req.body.profile.name);
            
            if(!validator.isAlphanumeric(req.body.profile.name)){
                errors.arrayError.push({
                    message: 'Name only excepts letters and numbers',
                    field: 'name'
                });
            }else{
                const isProfileExists: boolean = await ProfileService.isProfileNameExists(req.body.profile.name);
                        isProfileExists && errors.arrayError.push({
                    message: 'Profile with that name already exists ',
                    field: 'Profile name'
                });

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
        }else{
            errors.arrayError.push({
                message: 'Missing required field',
                field: 'name'
            });
        }
        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }

}

export default new ProfilesMiddleware();