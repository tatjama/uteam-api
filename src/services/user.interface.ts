import { RegisterUserDto } from "../dto/register.user.dto";
import { UserModel } from "../models/User";

export interface IUserService{
    create: (resource: RegisterUserDto) => Promise<number>;
   findByEmailOrUsername: (email: string, username: string) => Promise<UserModel | null>
}