import express from 'express';
import controller from '../controllers/profiles.controller';

const router: express.Router = express.Router();

router.get('/', controller.getProfiles);

router.post('/', controller.createProfile);


export default router;