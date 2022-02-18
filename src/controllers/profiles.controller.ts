import { Request, Response, NextFunction } from 'express';
import { ProfileDto } from '../dto/profile.dto';
import ProfileService from '../services/profile.service';
import { internalError } from '../errors/errors/internal.errors';

const createProfile = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const profileId: number = await ProfileService.createProfile(req.body);
        res.status(201).json({ message: ` Profile id = ${profileId}`});    
    } catch (error) {
        next(internalError());
    }    
}

const getProfiles = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        const result: ProfileDto[] = await ProfileService.getProfiles(0, 20);
        res.status(200).json(result);    
    } catch (error) {
        next(internalError());
    }    
}

const getProfileById = async( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        res.status(200).json(res.locals.profile);
    } catch (error) {
        next(internalError());
    }
}

const putProfile = async (req: Request, res: Response, next: NextFunction ): Promise<void> => {    
    try {
        const updatedProfile = await ProfileService.putProfile(req.body);
        res.status(200).json(updatedProfile);    
    } catch (error) {
        next(internalError());
    }    
}

const removeProfile = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try {
        await ProfileService.deleteById(req.body.id);
        res.status(204).json();    
    } catch (error) {
        next(internalError());        
    }    
}


export default {  createProfile, getProfiles, getProfileById, putProfile, removeProfile }