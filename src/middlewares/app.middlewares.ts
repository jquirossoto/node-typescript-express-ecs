import { Request, Response, NextFunction } from 'express';

import { buildErrorResponse } from './../utils/api.utils';

export function authorize(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(403).json(buildErrorResponse('UNAUTHORIZED'));
    }
    return next();
}
