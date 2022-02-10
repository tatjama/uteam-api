import { Request, Response, NextFunction } from 'express';
import { ReqUser } from '../dto/register.user.dto';
import { CompanyDto } from '../dto/company.dto';
import CompanyService from '../services/company.service';
import MyError from '../models/messages/MyError';
import { companyFieldsValidation } from '../utility/helper';
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

    provideCompanyName = async (req: ReqUser, res: Response, next: NextFunction): Promise<void>=> {
        !req.body.name && (req.body.name = req.user?.username + "'s Company");
        next();
    }

    validateCompanyUpdateFieldsExists = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
        !req.body.name && !req.body.logo? 
            res.status(400).send( new MyError ('create company', 'validation', 400,[{
                message: 'Input fields are empty! You must provide at least one input field',
                field: 'Company name and logo'
            }]))  : next();
    }

    validateCompanyFields = async (req: ReqUser, res: Response, next: NextFunction): Promise<void> => {
        const {errors, name, logo} = companyFieldsValidation(req.body.name,req.body.logo);
        req.body.name = name;
        req.body.logo = logo;
        
        if (req.body.name){
            const isCompanyExist: boolean = await CompanyService.isCompanyExistByName(req.body.name);
            isCompanyExist && errors.arrayError.push({
            message: 'Company with that name already exists ',
            field: 'Company name'
            });
        }

        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }
    
    validateCompanyFieldsExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {errors, name, logo} = companyFieldsValidation(req.body.profile.company.name, req.body.profile.company.logo);
        req.body.profile.company.name = name; 
        req.body.profile.company.logo = logo;

        if(req.body.profile.company.name){
            const isCompanyExist: boolean = await CompanyService.isCompanyExistByName(req.body.profile.company.name);
            isCompanyExist && errors.arrayError.push({
                message: 'Company with that name already exists ',
                field: 'Company name'
            });
            }
        if(!req.body.profile.company.name){
                req.body.profile.company.name = req.body.username+"'s Company";  
            }

        errors.arrayError.length > 0? res.status(400).send(errors): next();
    }

} 

export default new CompaniesMiddleware();

