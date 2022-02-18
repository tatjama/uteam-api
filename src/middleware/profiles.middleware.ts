import { Request, Response, NextFunction} from 'express';
import { ReqUser } from '../dto/register.user.dto';
import { ProfileDto } from '../dto/profile.dto';
import ProfileService from '../services/profile.service';
import { fieldsValidation } from '../utility/validations';
import { isProfileNoExistsError, isProfileNameExistsError, emptyProfileInputError, validateProfileExistsError } 
        from '../errors/errors/profile.errors';
class ProfilesMiddleware{
    extractProfileId = (req: Request, res: Response, next: NextFunction) => {
        req.body.id = req.params.id;
        next();
    }

    isProfileNoExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const isProfileExist: boolean = await ProfileService.isProfileExistByUserId(req.body.userId);
        isProfileExist? next(isProfileNoExistsError()): next();
    }

    isProfileNameExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        if(req.body.name){
            const isProfileNameExists: boolean = await ProfileService.isProfileNameExists(req.body.name);
            isProfileNameExists? next(isProfileNameExistsError()): next();
        }else{
            req.body.profilePhoto? next(): next(emptyProfileInputError());            
        }        
    }

    validateProfileExists = async (req: Request, res: Response, next: NextFunction) => {
        const profile: ProfileDto | null= await ProfileService.getProfileById(req.body.id);
        if(profile){
            res.locals.profile = profile;
            next();
        }else{
            next(validateProfileExistsError());
        }
    }

    validateProfileFields = async (req: ReqUser, res: Response, next: NextFunction): Promise<void> => {
        const {errors, name, url} = fieldsValidation(req.body.name, req.body.profilePhoto, 
            'error create Profile', 'Profile name', "profilePhoto"); 
        req.body.name = name;
        req.body.profilePhoto = url;       
        errors.arrayError.length > 0? next(errors): next();
    }

    validateProfileEditFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {errors, name, url}  =  fieldsValidation(req.body.name, req.body.profilePhoto,
            'error create Profile', 'Profile name', "profilePhoto");
        req.body.name = name;
        req.body.profilePhoto = url;       
        errors.arrayError.length > 0? next(errors): next();
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
               
        errors.arrayError.length > 0? next(errors): next();
    }

}

export default new ProfilesMiddleware();