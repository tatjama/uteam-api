import { StatusEnumValue } from '../models/Profile';
import { UserModel } from "../models/User";
import { UserDto, createUserDto } from '../dto/user.dto';
import { CompanyModel } from '../models/Company';
import { CompanyDto, createCompanyDto } from './company.dto';

export interface ProfileDto{
    id: number,  
    name: string,
    profilePhoto: string,
    status: StatusEnumValue,
    user: UserDto,
    company: CompanyDto | null

}

export const createProfileDto  =  
(id: number, name: string, profilePhoto: string, status: StatusEnumValue, user: UserModel, company: CompanyModel): ProfileDto => {
    const userDto: UserDto =  createUserDto(user.id,user.username, user.email, user.role);
    const companyDto: CompanyDto |null  = company? createCompanyDto(company.id, company.name, company.logo, company.slug, 
        company.createdAt, company.updatedAt, []): null;
    return { 
        id : id,
        name: name,
        profilePhoto: profilePhoto,
        status: status,
        user: userDto,
        company: companyDto,
    }
}