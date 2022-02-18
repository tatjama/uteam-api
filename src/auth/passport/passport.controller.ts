import  { Response } from 'express';
import { ReqUser } from '../../dto/register.user.dto';
import AuthController from '../auth.jwt';
import Message from '../../utility/data';


const localPassport = async(req: ReqUser, res: Response): Promise<Response<string| Message>> => {
        try{ 
            
            const jwtToken = (req.user?.username) && AuthController.createJWT(req.user?.username);
            return res.status(200).json(jwtToken);
        }catch (error){
            return res.status(500).json({  message:'Server error'});
        }
    }
    
export default { localPassport };

