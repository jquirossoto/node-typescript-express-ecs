/**
 * @file App middlewares.
 * @author jquirossoto
 */

import { Request, Response, NextFunction } from 'express';
import Ajv, { DefinedError, AnySchema } from "ajv";

import { buildErrorResponse } from './../utils/api.utils';

const ajv = new Ajv({ allErrors: true });

/**
 * Authorize middleware.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const authorize = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== '65c95f0d-debc-4f4f-9b1d-473b0b492fde') {
        return res.status(403).json(buildErrorResponse(['UNAUTHORIZED']));
    }
    return next();
}

/**
 * Validate schema middleware.
 *
 * @param  {AnySchema} schema
 */
export const validateSchema = (schema: AnySchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validate = ajv.compile(schema);
        if (!validate(req.body)) {
            const errors: string[] = [];
            for (const err of validate.errors as DefinedError[]) {
                if (err.message) {
                    errors.push(err.message);
                }
            }
            return res.status(422).json(buildErrorResponse(errors));
        }
        return next();
    };
}