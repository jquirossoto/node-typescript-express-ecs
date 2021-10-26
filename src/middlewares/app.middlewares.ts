import { Request, Response, NextFunction } from 'express';
import Ajv, { DefinedError } from "ajv";

import { buildErrorResponse } from './../utils/api.utils';

const ajv = new Ajv({ allErrors: true });

export function authorize(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey) {
        return res.status(403).json(buildErrorResponse(['UNAUTHORIZED']));
    }
    return next();
}

export const validateSchema = (schema: object) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.compile(schema);
        if (!validate(req.body)) {
            const errors: string[] = [];
            for (const err of validate.errors as DefinedError[]) {
                errors.push(err.message!)
            }
            return res.status(422).json(buildErrorResponse(errors));
        }
        return next();
    };
}