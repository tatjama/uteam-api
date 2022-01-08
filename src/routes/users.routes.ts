import express from 'express';
import UsersMiddleware from '../middleware/users.middleware';
import controller from '../controllers/users.controller';
import { body } from 'express-validator';

const router = express.Router();

router.get('/', controller.getMessage);

router.post('/login', 
     body('username').trim().not().matches("[^A-Za-z0-9*#%_-]").withMessage('Username only excepts letters, numbers and #%-_*'),     
     body('username').matches('^[a-zA-Z]').withMessage('Username must start with a letter').optional(), 
     body('email').trim().isEmail().optional(),
     body('password').trim().isLength({ min: 6 }).withMessage('Must include password (6+ characters)'),
     UsersMiddleware.validateBodyFieldsErrors,
     UsersMiddleware.validateLoginUserFieldsExist,
     UsersMiddleware.validatePassword, 
     controller.login);

router.post('/register',
     body('username').trim().not().matches("[^A-Za-z0-9*#%_-]").withMessage('Username only excepts letters, numbers and #%-_*'),     
     body('username').matches('^[a-zA-Z]').withMessage('Username must start with a letter'),     
     body('email').trim().isEmail(),
     body('password').trim().isLength({ min: 6 }).withMessage('Must include password (6+ characters)'),
     UsersMiddleware.validateBodyFieldsErrors,
     UsersMiddleware.validateUserNoExist, 
     controller.register);

router.get('/users', controller.getUsers);

export default router;

