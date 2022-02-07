import  express from 'express';
import passport from 'passport';
import UsersMiddleware from '../middleware/users.middleware';
import ProfilesMiddleware from '../middleware/profiles.middleware';
import CompaniesMiddleware from '../middleware/companies.middleware';
import controller from '../controllers/users.controller';
import passportController from '../auth/auth.controller';

const router: express.Router = express.Router();

router.get('/', controller.getMessage);

router.post('/login', 
     UsersMiddleware.validateLoginUserFields,
     passport.authenticate('local', {session: false}), 
     passportController.localPassport);

router.post('/register',
     UsersMiddleware.validateRegisterUserFieldsExist,
     UsersMiddleware.validateRegisterUserFields,
     UsersMiddleware.validateUserNoExist, 
     ProfilesMiddleware.validateProfileFieldsExist,
     ProfilesMiddleware.isProfileNameExists,
     CompaniesMiddleware.validateCompanyFieldsExists,
     controller.register);

router.get('/users', controller.getUsers);

export default router;

