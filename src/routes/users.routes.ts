import express from 'express';
import UsersMiddleware from '../middleware/users.middleware';
import ProfilesMiddleware from '../middleware/profiles.middleware';
import CompaniesMiddleware from '../middleware/companies.middleware';
import controller from '../controllers/users.controller';

const router: express.Router = express.Router();

router.get('/', controller.getMessage);

router.post('/login', 
     UsersMiddleware.validateLoginUserFields,
     UsersMiddleware.validatePassword, 
     controller.login);

router.post('/register',
     UsersMiddleware.validateRegisterUserFieldsExist,
     UsersMiddleware.validateRegisterUserFields,
     UsersMiddleware.validateUserNoExist, 
     ProfilesMiddleware.validateProfileFieldsExist,
     CompaniesMiddleware.validateCompanyFieldsExists,
     controller.register);

router.get('/users', controller.getUsers);

export default router;

