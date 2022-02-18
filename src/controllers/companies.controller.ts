import { Request, Response, NextFunction } from "express";
import { CompanyDto } from '../dto/company.dto';
import CompanyService from "../services/company.service";
import { internalError } from "../errors/errors/internal.errors";

const createCompany = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const companyId: number = await CompanyService.createCompany(req.body);
        res.status(201).json({ message: ` Company id = ${companyId}`});    
    } catch (error) {
        next(internalError());
    }    
}

const getCompanies = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const result: CompanyDto[] = await CompanyService.getCompanies(0, 20);
        res.status(200).json(result);    
    } catch (error) {
        next(internalError());
    }    
}

const getCompanyById  = async( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        res.status(200).json(res.locals.company);
    } catch (error) {
        next(internalError());   
    }
}

const putCompany = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {    
    try {
        const updatedCompany = await CompanyService.putCompany(req.body, req.body.id);
        res.status(200).json(updatedCompany);    
    } catch (error) {
        next(internalError());
    }    
}

const removeCompany = async( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        await CompanyService.deleteById(req.body.id);
        res.status(204).json();    
    } catch (error) {
        next(internalError());
    }        
}

export default { createCompany, getCompanies, getCompanyById, putCompany, removeCompany }