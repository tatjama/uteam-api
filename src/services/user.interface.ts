import {  UserDto } from "../dto/user.dto";
import { RegisterUserDto } from "../dto/register.user.dto";

export interface IUserService{
    create: (resource: RegisterUserDto) => Promise<number>;
    findByUsername:(username: string) => Promise<number | null>;
    findByEmailOrUsername: (email: string, username: string) => Promise<UserDto | null>;
    findById: (id:string) => Promise<UserDto | null> ;
    getUsers:(page: number, limit: number) => Promise<UserDto[]>;

}
