import { RegisterUserDto } from "../dto/register.user.dto";
import { UserModel } from "../models/User";

export interface IUserService{
   // findAll: (limit: number, page: number) => Promise<string>;
    create: (resource: RegisterUserDto) => Promise<number>;
   // findById: (id: string) => Promise<string>;
   findByEmailOrUsername: (email: string, username: string) => Promise<UserModel | null>
   // findByUsername: (username: string) => Promise<string>;
  // loginUser: (email: string, username: string, password: string) => Promise<UserModel | null>
}