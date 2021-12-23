import { Request, Response, NextFunction } from 'express';
import { message } from '../utility/data';

const getMessages = (req: Request, res: Response, next: NextFunction) => {
    let  result = message; 
    return res.status(200).json(result);
}

const getMessage = (req: Request, res: Response, next: NextFunction) => {
    let result = message;
    return res.status(200).json(result);
}

const updateMessage = (req: Request, res: Response, next: NextFunction) => {
    let result = message;
    return res.status(200).json(result);
}

const deleteMessage = (req: Request, res: Response, next: NextFunction) => {
    let result = message;
    return res.status(200).json(result);
}

const addMessage = (req: Request, res: Response, next: NextFunction) => {
    let result = message;
    return res.status(200).json(result);
}

export default { getMessages, getMessage, updateMessage, deleteMessage, addMessage};