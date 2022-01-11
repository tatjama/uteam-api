import express from 'express';
import controller from '../controllers/profiles.controller';
import ProfilesMiddleware from '../middleware/profiles.middleware';

const router: express.Router = express.Router();

router.get('/', controller.getProfiles);

router.post('/', controller.createProfile);

router.get('/:id', ProfilesMiddleware.extractProfileId, controller.getProfileById);


export default router;