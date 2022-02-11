import { Request, Response, NextFunction } from 'express';
import { ReqUser } from '../dto/register.user.dto';
import { CompanyDto } from '../dto/company.dto';
import CompanyService from '../services/company.service';
import { isCompanyNoExistsError, validateCompanyExistsError, validateCompanyUpdateFieldsExistsError } 
        from '../errors/errors/company.errors';
import { fieldsValidation } from '../utility/validations';
class CompaniesMiddleware {
    extractCompanyId = (req: Request, res: Response, next: NextFunction) => {
        req.body.id = req.params.id;
        next();
    }
    
    isCompanyNoExist = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
        const isCompanyExist: boolean = await CompanyService.isCompanyExistByName(req.body.name);        
        isCompanyExist? next(isCompanyNoExistsError()): next();
    }

    validateCompanyExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const company: CompanyDto | null= await CompanyService.getCompanyById(req.body.id);
        if(company){
            res.locals.company = company;
            next();
        }else{
            next(validateCompanyExistsError());
        }    
    }

    provideCompanyName = async (req: ReqUser, res: Response, next: NextFunction): Promise<void>=> {
        !req.body.name && (req.body.name = req.user?.username + "'s Company");
        next();
    }

    validateCompanyUpdateFieldsExists = async (req: Request, res: Response, next: NextFunction): Promise<void>=> {
        !req.body.name && !req.body.logo? next(validateCompanyUpdateFieldsExistsError()) : next();
    }

    validateCompanyFields = async (req: ReqUser, res: Response, next: NextFunction): Promise<void> => {
        const {errors, name, url} = fieldsValidation( req.body.name,req.body.logo, 'error create company', 
        'Company name', "Company logo");
        req.body.name = name;
        req.body.logo = url;
        
        if (req.body.name){
            const isCompanyExist: boolean = await CompanyService.isCompanyExistByName(req.body.name);
            isCompanyExist && errors.arrayError.push({
            message: 'Company with that name already exists ',
            field: 'Company name'
            });
        }

        errors.arrayError.length > 0? next(errors): next();
    }
    
    validateCompanyFieldsExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const {errors, name, url} = fieldsValidation(req.body.profile.company.name, req.body.profile.company.logo, 
            'error create company', 'Company name', "Company logo");
        req.body.profile.company.name = name; 
        req.body.profile.company.logo = url;

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

        errors.arrayError.length > 0? next(errors): next();
    }

} 

export default new CompaniesMiddleware();

