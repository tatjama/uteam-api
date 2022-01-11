import { Request, Response, NextFunction} from 'express';

class ProfilesMiddleware{
    extractProfileId = (req: Request, res: Response, next: NextFunction) => {
        req.body.id = req.params.id;
        next();
    }

}

export default new ProfilesMiddleware();