import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import { CompanyDto } from '../dto/company.dto';
import CompanyService from '../services/company.service';
import MyError from '../models/messages/MyError';

class CompaniesMiddleware {
    extractCompanyId = (req: Request, res: Response, next: NextFunction) => {
        req.body.id = req.params.id;
        next();
    }
    
    isCompanyNoExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const isCompanyExist: boolean = await CompanyService.isCompanyExistByName(req.body.name);
        isCompanyExist? res.status(400).send( new MyError ('find company', 'validation', 400,[{
                                            message: 'company with that name  already exists!',
                                            field: 'name '
                                        }])): next();
    }

    
    // CASE - NAME AND LOGO URL ARE REQUIRED
    //If all fields are NOT required remove function and call validateCompanyEditFields
    
    validateCompanyFields = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        
        const errors: MyError = new MyError( 'error create company', 'validation', 400, [] );

        if(req.body.name){
            req.body.name = validator.trim(req.body.name);

            if(!validator.isAlphanumeric(req.body.name, 'en-US', {ignore: "%#*- '"})){
                errors.arrayError.push({
                    message: 'Name only excepts letters, numbers and "%#*- \'" characters',
                    field: 'Company name'
                });
            }else{
                const isCompanyExist: boolean = await CompanyService.isCompanyExistByName(req.body.name);
                isCompanyExist && errors.arrayError.push({
                message: 'Company with that name already exists ',
                field: 'Company name'
            });
            }
            
        } else {
            req.body.name = '';
            errors.arrayError.push({
                message: 'Missing required field',
                field: 'Company name'
            });
        } 

        if(req.body.logo){
            req.body.logo = validator.trim(req.body.logo);
            if(!validator.isURL(req.body.logo)){
                errors.arrayError.push({
                    message: 'logo must be url',
                    field: 'Company logo'
                })
            }
        } else {
            req.body.logo = '';
            errors.arrayError.push({
                message: 'Missing required field',
                field: 'Company logo'
            });
        } 

        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }

    validateCompanyExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const company: CompanyDto | null= await CompanyService.getCompanyById(req.body.id);
        if(company){
            res.locals.company = company;
            next();
        }else{
            res.status(404).send(new MyError( 'Error Not found', 'validation', 404,[{
                message: 'company with that ID does not exist!',
                field: 'company id '
            }]))
        }
    
    }

    validateCompanyFieldsExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        
        const errors: MyError = new MyError( 'error create company', 'validation', 400, [] );

        if(req.body.profile.company.name){
            req.body.profile.company.name = validator.trim(req.body.profile.company.name);          

            if(!validator.isAlphanumeric(req.body.profile.company.name, 'en-US', {ignore: "%#*- '"})){
                errors.arrayError.push({
                    message: 'Name only excepts letters, numbers and "%#*- \'" characters',
                    field: 'Company name'
                });
            }else{
               const isCompanyExist: boolean = await CompanyService.isCompanyExistByName(req.body.profile.company.name);
            isCompanyExist && errors.arrayError.push({
                message: 'Company with that name already exists ',
                field: 'Company name'
            });
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

            } else {
                req.body.profile.company.name = req.body.username+"'s Company";   
                if(req.body.profile.company.logo){
                    req.body.profile.company.logo = validator.trim(req.body.profile.company.logo);
                    if(!validator.isURL(req.body.profile.company.logo)){
                        errors.arrayError.push({
                            message: 'logo must be url',
                            field: 'Company logo'
                        })
                    }
                }          
            }

        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }

} 

export default new CompaniesMiddleware();

