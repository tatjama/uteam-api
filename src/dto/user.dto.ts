import { RoleEnumValue } from '../models/User';

export interface UserDto{
    id: number,
    username: string,
    email: string,
    role: RoleEnumValue,
}

export const createUserDto  =  (id: number, username: string, email: string, role: RoleEnumValue): UserDto => {
    return { 
        id : id,
        username: username,
        email: email,
        role: role
    }
}
export interface LoginUserDto{
    username: string;
}

export const createLoginUserDto  =  ( username: string): LoginUserDto => {
    return { 
        username: username,
    }
}