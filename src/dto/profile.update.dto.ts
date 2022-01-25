import { StatusEnumValue } from '../models/Profile';

export interface ProfileUpdateDto{
    id: number,  
    name: string,
    profilePhoto: string,
    status: StatusEnumValue,
    UserId: number,
    CompanyId: number | null

}

export const createProfileUpdateDto  =  
(id: number, name: string, profilePhoto: string, status: StatusEnumValue, UserId: number, CompanyId: number | null)
: ProfileUpdateDto => {
   
    return { 
        id : id,
        name: name,
        profilePhoto: profilePhoto,
        status: status,
        UserId: UserId,
        CompanyId: CompanyId,
    }
}