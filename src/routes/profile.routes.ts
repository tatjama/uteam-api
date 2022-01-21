import express from 'express';
import controller from '../controllers/profiles.controller';
import ProfilesMiddleware from '../middleware/profiles.middleware';

const router: express.Router = express.Router();

router.get('/', controller.getProfiles);

router.post('/', 
    ProfilesMiddleware.validateProfileFields, 
    //ProfilesMiddleware.validateProfileNoExist, 
    ProfilesMiddleware.isProfileNoExist, 
    controller.createProfile);

router.get('/:id', 
    ProfilesMiddleware.extractProfileId, 
    ProfilesMiddleware.validateProfileExists,
    controller.getProfileById);

router.put('/:id',
    ProfilesMiddleware.validateProfileEditFields,
    ProfilesMiddleware.extractProfileId,
    ProfilesMiddleware.validateProfileExists,
    controller.putProfile);    

router.delete('/:id',
    ProfilesMiddleware.extractProfileId,
    controller.removeProfile);


export default router;