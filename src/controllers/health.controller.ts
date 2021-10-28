import { Request, Response } from 'express';

export const list = async (req: Request, res: Response) => {
    res.status(200).send();
}