import express from 'express';
import controller from '../controllers/companies.controller';

const router: express.Router = express.Router();

router.post('/', controller.createCompany);

export default router;