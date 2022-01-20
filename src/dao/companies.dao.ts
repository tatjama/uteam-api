import { Company, CompanyModel } from '../models/Company';
import { CompanyDto, createCompanyDto } from '../dto/company.dto';
import { RegisterCompanyDto } from '../dto/register.company.dto';


class CompaniesDao{
    createCompany = async (registerCompanyDto: RegisterCompanyDto): Promise<number> => {
        const company: CompanyModel = await Company.create(registerCompanyDto);
        console.log(company.slug)
        return company.id;
    }

    /*getCompanyByName = async (name: string): Promise<CompanyDto | null>=> {
        const company: CompanyModel | null = await Company.findOne({ where: { name: name},
       // include:[ {model: User }], 
    });
        return company? createCompanyDto(company.id, company.name, company.logo, company.slug, company.createdAt,
             company.updatedAt): null;
    }*/

    isCompanyExistByName = async (name:string): Promise<boolean> => {
        const company: CompanyModel | null = await Company.findOne({ where: {name: name}});
        return company? true : false;
    }

    getCompanies = async ( page: number, limit: number): Promise<CompanyDto[] | []> => {
        const companies: CompanyModel[] | null= await Company.findAll(            
                {
                    offset: page *limit | 0, 
                    limit:limit | 20,
                   // include:[ {model: User }]
                 }
            );
        return companies.map(company => 
            createCompanyDto( company.id, company.name, company.logo, company.slug, company.createdAt,
                company.updatedAt));
    }

    getCompanyById = async ( companyId: string ): Promise<CompanyDto | null> => {
        const company: CompanyModel | null  = await Company.findByPk(companyId, {
            //include:[ {model: User }],
        });
        return company? createCompanyDto(company.id, company.name, company.logo, company.slug, company.createdAt, 
            company.updatedAt): null;
    }   


}

export default new CompaniesDao();
