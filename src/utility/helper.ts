import bcryptjs from 'bcryptjs';

export const  slugify = (value1: string, value2:string): string => {
    return value1.toString().toLowerCase().trim()
    .replace(/\s+/g, '-') //replace spaces with -
    .replace(/&/g, '-and-')// replace & with and
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-')//Replace multiple - with single -
    + "_" + value2;
}

export const myHash = (value: string): string => {
    return bcryptjs.hashSync(value, 10);
}

export const myHashCompare = (hashedPassword: string, userPassword: string): boolean=> {
    return bcryptjs.compareSync(hashedPassword, userPassword)? true: false;
}