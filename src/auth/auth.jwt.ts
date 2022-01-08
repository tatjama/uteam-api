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
            const refreshId: string = req.body.id + jwtSecret;
            const hash: string = bcryptjs.hashSync(refreshId, 10);
            const token: string = jwt.sign(req.body, jwtSecret, { expiresIn: tokenExpiry});
            return ({accessToken: token, refreshToken: hash});        
    }
}

export default new AuthJWT();