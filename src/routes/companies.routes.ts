import express from 'express';
import passport from 'passport';
import controller from '../controllers/companies.controller';
import CompaniesMiddleware from '../middleware/companies.middleware';

const router: express.Router = express.Router();

router.get('/', controller.getCompanies);

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    CompaniesMiddleware.validateCompanyFields, 
    CompaniesMiddleware.isCompanyNoExist,
    controller.createCompany);

router.get('/:id',
    CompaniesMiddleware.extractCompanyId, 
    CompaniesMiddleware.validateCompanyExists,
    controller.getCompanyById);

router.put('/:id',
    passport.authenticate('jwt', {session: false}),    
    CompaniesMiddleware.validateCompanyFields,
    CompaniesMiddleware.extractCompanyId,
    CompaniesMiddleware.validateCompanyExists,
    controller.putCompany);

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),    
    CompaniesMiddleware.extractCompanyId,
    controller.removeCompany);    

export default router;