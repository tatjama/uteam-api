import { Request } from 'express';
export interface RegisterUserDtoLite{
    username: string,
    email: string,
    password: string,
}

export interface RegisterUserDto{
    username: string,
    email: string,
    password: string,
    profile: {
        name: string, profilePhoto?: string,
        company:{
            name?: string,
            logo?: string,
        }
    }
}

export interface ReqUser extends Request{
    user?:{
         id?:number,
         email?: string,
         username?: string
    }
}