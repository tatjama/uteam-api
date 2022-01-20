import { ICompanyService } from '../services/company.interface';
import { CompanyDto } from '../dto/company.dto';
import { RegisterCompanyDto } from '../dto/register.company.dto';
import  CompaniesDao  from '../dao/companies.dao';

class CompanyService implements ICompanyService {
    createCompany = async(registerCompanyDto: RegisterCompanyDto): Promise<number> => {
        return CompaniesDao.createCompany(registerCompanyDto);
    }
}

export default new CompanyService();