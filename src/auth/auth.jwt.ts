import jwt from 'jsonwebtoken';

const jwtSecret: string = process.env.JWT_SECRET as string;
const tokenExpiry: number = 60 * 60 * 10;
class AuthJWT{
    createJWT = ( username: string): string => { 
            const token: string = jwt.sign({username}, jwtSecret, { expiresIn: tokenExpiry});       
            return (token);        
    }
}

export default new AuthJWT();