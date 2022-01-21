import { Request, Response } from "express";
import CompanyService from "../services/company.service";
import { CompanyDto } from '../dto/company.dto';
import Message from "../models/messages/Message";

const createCompany = async ( req: Request, res: Response ): Promise<Response<Message>> => {
    const companyId: number = await CompanyService.createCompany(req.body);
    return res.status(201).json({ message: ` Company id = ${companyId}`});
}

const getCompanies = async ( req: Request, res: Response ): Promise<Response<CompanyDto[] >> => {
    const result: CompanyDto[] = await CompanyService.getCompanies(0, 20);
    return res.status(200).json(result);
}

const getCompanyById  = async( req: Request, res: Response): Promise<Response<CompanyDto>> => {
    return res.status(200).json(res.locals.company);
}

const removeCompany = async( req: Request, res: Response): Promise<Response> => {
    await CompanyService.deleteById(req.body.id);
    return res.status(204).json();    
}

export default { createCompany, getCompanies, getCompanyById, removeCompany }