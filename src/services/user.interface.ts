import {  LoginUserDto } from "../dto/login.user.dto";
import { RegisterUserDto } from "../dto/register.user.dto";

export interface IUserService{
    create: (resource: RegisterUserDto) => Promise<number>;
    findByEmailOrUsername: (email: string, username: string) => Promise<LoginUserDto | null>;
    getUsers:(page: number, limit: number) => Promise<LoginUserDto[]>;
}
