import { StatusEnumValue } from '../models/Profile';

export interface ProfileUpdateDto{
    id: number,  
    name: string,
    profilePhoto: string,
    status: StatusEnumValue,
    userId: number,
    CompanyId: number | null

}

export const createProfileUpdateDto  =  
(id: number, name: string, profilePhoto: string, status: StatusEnumValue, userId: number, CompanyId: number | null)
: ProfileUpdateDto => {
   
    return { 
        id : id,
        name: name,
        profilePhoto: profilePhoto,
        status: status,
        userId: userId,
        CompanyId: CompanyId,
    }
}

export interface ProfileCreateDto{
    id: number,  
    name: string,
    profilePhoto: string,
    status: StatusEnumValue,
    userId: number,
    CompanyId: number | null

}

export const createProfileCreateDto  =  
(id: number, name: string, profilePhoto: string, status: StatusEnumValue, userId: number, CompanyId: number | null)
: ProfileCreateDto => {
   
    return { 
        id : id,
        name: name,
        profilePhoto: profilePhoto,
        status: status,
        userId: userId,
        CompanyId: CompanyId,
    }
}

