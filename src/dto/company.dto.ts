//import { ProfileDto } from './profile.dto';

export interface CompanyDto{
    id: number,  
    name: string,
    logo: string,
    slug?: string;
    createdAt: Date;
    updatedAt: Date;
    //profiles: ProfileDto[],
}

export const createCompanyDto  =  
(id: number, name: string, logo: string, slug: string, createdAt: Date, updatedAt: Date): CompanyDto => {
    //const profilesDto: ProfileDto[] = profiles.map(profile => createProfileDto(profile.id, profile.name, profile.profilePhoto)) 
    return { 
        id : id,
        name: name,
        logo: logo,
        slug: slug,
        createdAt: createdAt,
        updatedAt: updatedAt,
    }
}