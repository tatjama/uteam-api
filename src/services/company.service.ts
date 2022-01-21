import { ICompanyService } from '../services/company.interface';
import { CompanyDto } from '../dto/company.dto';
import { RegisterCompanyDto } from '../dto/register.company.dto';
import  CompaniesDao  from '../dao/companies.dao';

class CompanyService implements ICompanyService {
    createCompany = async(registerCompanyDto: RegisterCompanyDto): Promise<number> => {
        return CompaniesDao.createCompany(registerCompanyDto);
    }

    /*getCompanyByName = async(name: string): Promise<CompanyDto | null> => {
        return CompaniesDao.getCompanyByName(name);
    }*/

    isCompanyExistByName = async(name: string): Promise<boolean> => {
        return CompaniesDao.isCompanyExistByName(name);
    }

    getCompanies = async (page: number, limit: number): Promise<CompanyDto[] | []> => {
        return CompaniesDao.getCompanies(page, limit);
    }

    getCompanyById =  async (id: string): Promise<CompanyDto | null> => {
        return CompaniesDao.getCompanyById(id);        
    }

    putCompany  = async (companyRegisterDto: RegisterCompanyDto, id: string): Promise<CompanyDto | null> => {
        return CompaniesDao.updateCompanyById(companyRegisterDto, id);
    }

    deleteById = async (id: string): Promise<void> => {
        CompaniesDao.deleteById(id);
   }
}

export default new CompanyService();