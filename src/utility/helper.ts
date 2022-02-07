import bcryptjs from 'bcryptjs';

export const  slugify = (value1: string): string => {
    return value1.toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') //replace spaces with -
    .replace(/--+/g, '-')//Replace multiple - with single -
    ;
}

export const myHash = (value: string): string => {
    return bcryptjs.hashSync(value, 10);
}

export const myHashCompare = ( userPassword: string, hashedPassword: string): boolean=> {
    return bcryptjs.compareSync( userPassword, hashedPassword)? true: false;
}