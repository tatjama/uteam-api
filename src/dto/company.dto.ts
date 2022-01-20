import { ProfileDto } from './profile.dto';

export interface CompanyDto{
    id: number,  
    name: string,
    logo: string,
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    //profiles: ProfileDto[],
}
