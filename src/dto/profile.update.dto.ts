import { StatusEnumValue } from '../models/Profile';

export interface ProfileUpdateDto{
    id: number,  
    name: string,
    profilePhoto: string,
    status: StatusEnumValue,
    userId: number,
    companyId: number | null

}

export const createProfileUpdateDto  =  
(id: number, name: string, profilePhoto: string, status: StatusEnumValue, userId: number, companyId: number | null)
: ProfileUpdateDto => {
   
    return { 
        id : id,
        name: name,
        profilePhoto: profilePhoto,
        status: status,
        userId: userId,
        companyId: companyId,
    }
}

