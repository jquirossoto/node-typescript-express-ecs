import { Request, Response } from 'express';

export async function list(req: Request, res: Response) {
    res.status(200).send();
}