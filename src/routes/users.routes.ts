import express from 'express';
import UsersMiddleware from '../middleware/users.middleware';
import controller from '../controllers/users.controller';

const router = express.Router();

router.get('/', controller.getMessage);
router.post('/login', 
     UsersMiddleware.validateLoginUserFieldsExist, UsersMiddleware.validatePassword, controller.login);
router.post('/register',
     UsersMiddleware.validateRegisterUserFieldsExist, UsersMiddleware.validateUserNoExist, controller.register);
router.get('/users', controller.getUsers)
export default router;

