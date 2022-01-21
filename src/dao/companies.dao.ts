import { Company, CompanyModel } from '../models/Company';
import { CompanyDto, createCompanyDto } from '../dto/company.dto';
import { RegisterCompanyDto } from '../dto/register.company.dto';

class CompaniesDao{
    createCompany = async (registerCompanyDto: RegisterCompanyDto): Promise<number> => {
        const company: CompanyModel = await Company.create(registerCompanyDto);
        return company.id;
    }

    isCompanyExistByName = async (name:string): Promise<boolean> => {
        const company: CompanyModel | null = await Company.findOne({ where: {name: name}});
        return company? true : false;
    }

    getCompanies = async ( page: number, limit: number): Promise<CompanyDto[] | []> => {
        const companies: CompanyModel[] | null= await Company.findAll(            
                {
                    offset: page *limit | 0, 
                    limit:limit | 20,
                   // include:[ {model: Profiles }]
                 }
            );
        return companies.map(company => 
            createCompanyDto( company.id, company.name, company.logo, company.slug, company.createdAt,
                company.updatedAt));
    }

    getCompanyById = async ( companyId: string ): Promise<CompanyDto | null> => {
        const company: CompanyModel | null  = await Company.findByPk(companyId, {
            //include:[ {model: Profiles }],
        });
        return company? createCompanyDto(company.id, company.name, company.logo, company.slug, company.createdAt, 
            company.updatedAt): null;
    } 
    
    updateCompanyById = async (companyRegisterDto: RegisterCompanyDto, id: string): Promise<CompanyDto | null> => {
        await Company.update( companyRegisterDto, {
            where: { 
             id: id,   
            }
        });
        const updatedCompany: CompanyModel | null= await Company.findByPk(id, {
             //include:[ {model: Profiles }],
        });
        return updatedCompany? createCompanyDto(updatedCompany.id, updatedCompany.name, updatedCompany.logo, 
        updatedCompany.slug, updatedCompany.createdAt, updatedCompany.updatedAt) : null;    
   }

    deleteById = async ( companyId: string): Promise<void> => {
        await Company.destroy({ where: { id: companyId}});
    }
}

export default new CompaniesDao();
