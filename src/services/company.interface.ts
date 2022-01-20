import { CompanyDto } from '../dto/company.dto';
import { RegisterCompanyDto } from '../dto/register.company.dto';

export interface ICompanyService{
    createCompany: ( registerCompanyDto: RegisterCompanyDto) => Promise<number>;
}