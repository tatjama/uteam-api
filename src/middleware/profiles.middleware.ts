import { Request, Response, NextFunction} from 'express';
import { ReqUser } from '../dto/register.user.dto';
import { ProfileDto } from '../dto/profile.dto';
import ProfileService from '../services/profile.service';
import MyError from '../models/messages/MyError';
import { fieldsValidation } from '../utility/helper';
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

    validateProfileFields = async (req: ReqUser, res: Response, next: NextFunction): Promise<void> => {
        const {errors, name, url} = fieldsValidation(req.body.name, req.body.profilePhoto, 
            'error create Profile', 'Profile name', "profilePhoto"); 
        req.body.name = name;
        req.body.profilePhoto = url;       
        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }

    validateProfileEditFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {errors, name, url}  =  fieldsValidation(req.body.name, req.body.profilePhoto,
            'error create Profile', 'Profile name', "profilePhoto");
        req.body.name = name;
        req.body.profilePhoto = url;       
        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }    
    
    // Validate profile fields when register
    validateProfileFieldsExist =  async (req: Request, res: Response, next: NextFunction) => {
        const {errors, name, url} = fieldsValidation( req.body.profile.name, req.body.profile.profilePhoto, 
            'error create Profile', 'Profile name', "profilePhoto");
        req.body.profile.name = name;
        req.body.profile.profilePhoto = url;         
        if(req.body.profile.name){            
                const isProfileExists: boolean = await ProfileService.isProfileNameExists(req.body.profile.name);
                        isProfileExists && errors.arrayError.push({
                    message: 'Profile with that name already exists ',
                    field: 'Profile name'
                });
            } else{
                errors.arrayError.push({
                message: 'Missing required field',
                field: 'Profile name'
                });                 
            }      
               
        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }

}

export default new ProfilesMiddleware();