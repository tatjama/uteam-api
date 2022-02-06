import express from 'express';
import controller from '../controllers/profiles.controller';
import ProfilesMiddleware from '../middleware/profiles.middleware';
import passport from "passport";

const router: express.Router = express.Router();

router.get('/', controller.getProfiles);

router.post('/', 
    passport.authenticate('jwt', {session: false}),
    ProfilesMiddleware.validateProfileFields,  
    ProfilesMiddleware.isProfileNoExist, 
    controller.createProfile);

router.get('/:id', 
    ProfilesMiddleware.extractProfileId, 
    ProfilesMiddleware.validateProfileExists,
    controller.getProfileById);

router.put('/:id',
    passport.authenticate('jwt', {session: false}),
    ProfilesMiddleware.validateProfileEditFields,
    ProfilesMiddleware.extractProfileId,
    ProfilesMiddleware.validateProfileExists,
    controller.putProfile);    

router.delete('/:id',
    passport.authenticate('jwt', {session: false}),
    ProfilesMiddleware.extractProfileId,
    controller.removeProfile);


export default router;