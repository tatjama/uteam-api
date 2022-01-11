import { LoginUserDto } from "./login.user.dto";
import { StatusEnumValue } from '../models/Profile';
import { UserModel } from "../models/User";
import { createLoginUserDto } from "./login.user.dto";

export interface ProfileDto{
    id: number,  
    name: string,
    profilePhoto: string,
    status: StatusEnumValue,
    user: LoginUserDto,

}

export const createProfileDto  =  
(id: number, name: string, profilePhoto: string, status: StatusEnumValue, user: UserModel): ProfileDto => {
    const userDto: LoginUserDto =  createLoginUserDto(user.id, user.username, user.email, user.password);
    return { 
        id : id,
        name: name,
        profilePhoto: profilePhoto,
        status: status,
        user: userDto
    }
}