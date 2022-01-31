import { ProfileUpdateDto, createProfileUpdateDto } from './profile.update.dto';
import { UserDto } from './user.dto';
export interface CompanyDto{
    id: number;
    name: string;
    logo: string;
    slug?: string;
    createdAt: Date;
    updatedAt: Date;
    profiles: ProfileUpdateDto[];
    companyOwner: number;
}

export const createCompanyDto  =  
    (id: number, name: string, logo: string, slug: string, createdAt: Date, updatedAt: Date, 
    profiles: ProfileUpdateDto[], companyOwner: UserDto): CompanyDto => {
        const createdProfiles: ProfileUpdateDto[] = 
              profiles.map((profile) => createProfileUpdateDto(profile.id, profile.name, 
              profile.profilePhoto, profile.status , profile.UserId, profile.CompanyId ));
        //const createdUser: UserDto =       
              

        return { 
            id : id,
            name: name,
            logo: logo,
            slug: slug,
            createdAt: createdAt,
            updatedAt: updatedAt,
            profiles: createdProfiles,
            companyOwner: companyOwner.id
        }
}