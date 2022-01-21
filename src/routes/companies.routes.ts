import express from 'express';
import controller from '../controllers/companies.controller';
import CompaniesMiddleware from '../middleware/companies.middleware';

const router: express.Router = express.Router();

router.get('/', controller.getCompanies);

router.post('/', 
    CompaniesMiddleware.validateCompanyFields, 
    CompaniesMiddleware.isCompanyNoExist,
    controller.createCompany);

router.get('/:id',
    CompaniesMiddleware.extractCompanyId, 
    CompaniesMiddleware.validateCompanyExists,
    controller.getCompanyById);

router.delete('/:id',
    CompaniesMiddleware.extractCompanyId,
    controller.removeCompany);    

export default router;