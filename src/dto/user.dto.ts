export interface UserDto{
    id: number,
    username: string,
    email: string,
}

export const createUserDto  =  (id: number, username: string, email: string): UserDto => {
    return { 
        id : id,
        username: username,
        email: email,
    }
}