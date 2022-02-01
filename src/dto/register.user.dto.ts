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