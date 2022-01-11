import { StatusEnumValue } from '../models/Profile';
import { UserModel } from "../models/User";
import { UserDto, createUserDto } from '../dto/user.dto';

export interface ProfileDto{
    id: number,  
    name: string,
    profilePhoto: string,
    status: StatusEnumValue,
    user: UserDto,

}

export const createProfileDto  =  
(id: number, name: string, profilePhoto: string, status: StatusEnumValue, user: UserModel): ProfileDto => {
    const userDto: UserDto =  createUserDto(user.id,user.username, user.email );
    return { 
        id : id,
        name: name,
        profilePhoto: profilePhoto,
        status: status,
        user: userDto
    }
}