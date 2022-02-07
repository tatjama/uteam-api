import { Request } from 'express';
import jwt from 'jsonwebtoken';

const jwtSecret: string = process.env.JWT_SECRET as string;
const tokenExpiry: number = 60 * 60 * 10;
class AuthJWT{
    createJWT = ( username: string): string => { 
       // const { username } = req.body;
        //console.log("username in JWT")
        console.log(username)
            const token: string = jwt.sign({username}, jwtSecret, { expiresIn: tokenExpiry});
            console.log(token)
            return (token);        
    }
}

export default new AuthJWT();