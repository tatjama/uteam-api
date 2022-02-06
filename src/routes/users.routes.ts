import  express, { Request, Response } from 'express';
import UsersMiddleware from '../middleware/users.middleware';
import ProfilesMiddleware from '../middleware/profiles.middleware';
import CompaniesMiddleware from '../middleware/companies.middleware';
import controller from '../controllers/users.controller';
import { ReqUser } from '../dto/register.user.dto';
import { User } from '../models/User';

import { myHashCompare } from '../utility/helper';
import jwt from 'jsonwebtoken';
import { message } from '../utility/data';

const router: express.Router = express.Router();

router.get('/', controller.getMessage);

//PASSPORT implementation
import passport from 'passport';

const jwtSecret: string = process.env.JWT_SECRET as string;
const tokenExpiry: number = 60 * 60 * 10;



router.post('/login', passport.authenticate('local', 
          {session: false}), 
          async (req: ReqUser, res: Response) => {

     //const email = req.body.email;
     //const password = req.body.password;
     try{ 
               const token = jwt.sign({username: req.user?.username}, 
                    jwtSecret, 
                    { expiresIn: tokenExpiry} )
               res.json(token);
     }catch (error){
          console.log(error);
          res.status(500).json({  message:'Server error'});
     }
     
})

/*router.post('/login', 
     UsersMiddleware.validateLoginUserFields,
     UsersMiddleware.validatePassword, 
     controller.login);*/

router.post('/register',
     UsersMiddleware.validateRegisterUserFieldsExist,
     UsersMiddleware.validateRegisterUserFields,
     UsersMiddleware.validateUserNoExist, 
     ProfilesMiddleware.validateProfileFieldsExist,
     CompaniesMiddleware.validateCompanyFieldsExists,
     controller.register);

router.get('/users', controller.getUsers);

export default router;

