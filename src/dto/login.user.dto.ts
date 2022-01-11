export interface LoginUserDto{
    id?: number,
    username?: string,
    email?: string,
    password: string
}

export const createLoginUserDto  =  (id: number, username: string, email: string, password: string): LoginUserDto => {
    return { 
        id : id,
        username: username,
        email: email,
        password: password
    }
}