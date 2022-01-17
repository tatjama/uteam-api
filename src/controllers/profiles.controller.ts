import { Request, Response } from 'express';
import { ProfileDto } from '../dto/profile.dto';
import ProfileService from '../services/profile.service';

import { message } from '../utility/data';
import Message from '../models/messages/Message';
import { StatusEnumValue } from '../models/Profile';

const createProfile = async ( req: Request, res: Response): Promise<Response<Message>> => {
    req.body.status = StatusEnumValue.PENDING;
    const profileId: number = await ProfileService.createProfile(req.body);
    return res.status(201).json({ message: ` Profile id = ${profileId}`});
}

const getProfiles = async ( req: Request, res: Response): Promise<Response<ProfileDto[] >> => {
    const result: ProfileDto[] = await ProfileService.getProfiles(0, 20);
    return res.status(200).json(result);
}

const getProfileById = async( req: Request, res: Response): Promise<Response<ProfileDto>> => {
    return res.status(200).json(res.locals.profile);
}

const getMessage = async (req: Request, res: Response):Promise<Response<Message>> => {
    return res.status(200).json(message);
}

const putProfile = async (req: Request, res: Response): Promise<Response<ProfileDto>> => {    
    const updatedProfile = await ProfileService.putProfile(req.body);
    return res.status(200).json(updatedProfile);
}

const removeProfile = async ( req: Request, res: Response): Promise<Response> => {
    await ProfileService.deleteById(req.body.id);
    return res.status(204).json();
}


export default {  createProfile, getProfiles, getProfileById, getMessage, putProfile, removeProfile }