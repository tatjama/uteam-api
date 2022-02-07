import { ProfileUpdateDto, createProfileUpdateDto } from './profile.update.dto';
export interface CompanyDto{
    id: number,  
    name: string,
    logo: string,
    slug?: string;
    createdAt: Date;
    updatedAt: Date;
    profiles: ProfileUpdateDto[],
}

export const createCompanyDto  =  
    (id: number, name: string, logo: string, slug: string, createdAt: Date, updatedAt: Date, 
    profiles: ProfileUpdateDto[]): CompanyDto => {
        const createdProfiles: ProfileUpdateDto[] = 
              profiles.map((profile) => createProfileUpdateDto(profile.id, profile.name, 
              profile.profilePhoto, profile.status , profile.userId, profile.CompanyId )) 
        return { 
            id : id,
            name: name,
            logo: logo,
            slug: slug,
            createdAt: createdAt,
            updatedAt: updatedAt,
            profiles: createdProfiles
        }
}