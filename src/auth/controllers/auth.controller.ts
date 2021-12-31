import  { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const jwtSecret: string = process.env.JWT_SECRET || 'JWTsecretstring';
const tokenExpiry: number = 60 * 60 * 10;

class AuthController{
    createJWT = async( req: Request, res: Response) => {
        try {
            const refreshId = req.body.id + jwtSecret;
            const hash = bcryptjs.hashSync(refreshId, 10);
            const token = jwt.sign(req.body, jwtSecret, { expiresIn: tokenExpiry});
           return ({accessToken: token, refreshToken: hash});
        }catch(error){
            res.status(500).send(error);            
        }
    }
}

export default new AuthController();