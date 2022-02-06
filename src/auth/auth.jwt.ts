import { Request } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const jwtSecret: string = process.env.JWT_SECRET as string;
const tokenExpiry: number = 60 * 60 * 10;

export interface AuthResponse { 
    accessToken: string,
    refreshToken: string
}
class AuthJWT{
    createJWT = ( req: Request): AuthResponse => { 
        const { username } = req.body
            const refreshToken: string = req.body.username + jwtSecret;
            const hash: string = bcryptjs.hashSync(refreshToken, 10);
            const token: string = jwt.sign({username}, jwtSecret, { expiresIn: tokenExpiry});
            return ({accessToken: token, refreshToken: hash});        
    }
}

export default new AuthJWT();