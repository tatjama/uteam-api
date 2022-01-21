import { CompanyDto } from '../dto/company.dto';
import { RegisterCompanyDto } from '../dto/register.company.dto';

export interface ICompanyService{
    createCompany: ( registerCompanyDto: RegisterCompanyDto) => Promise<number>;
    isCompanyExistByName:(name: string) => Promise<boolean>;
    getCompanies: (page: number, limit: number) => Promise<CompanyDto[] | []>;
    getCompanyById:(id: string) => Promise<CompanyDto | null>;
    putCompany: (companyRegisterDto: RegisterCompanyDto, id: string) => Promise<CompanyDto | null>;
    deleteById: ( id: string ) => Promise<void>; 
}