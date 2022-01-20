import { Request, Response } from "express";
import CompanyService from "../services/company.service";

import Message from "../models/messages/Message";

const createCompany = async ( req: Request, res: Response): Promise<Response<Message>> => {
    const companyId: number = await CompanyService.createCompany(req.body);
    return res.status(201).json({ message: ` Company id = ${companyId}`});
}

export default { createCompany }