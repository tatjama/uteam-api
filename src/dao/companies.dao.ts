import { Company, CompanyModel } from '../models/Company';
import { CompanyDto } from '../dto/company.dto';
import { RegisterCompanyDto } from '../dto/register.company.dto';

class CompaniesDao{
    createCompany = async (registerCompanyDto: RegisterCompanyDto): Promise<number> => {
        const company: CompanyModel = await Company.create(registerCompanyDto);
        console.log(company.slug)
        return company.id;
    }

}

export default new CompaniesDao();
