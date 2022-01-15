/**
 * @file App middlewares.
 * @author jquirossoto
 */

import { Request, Response, NextFunction } from 'express';
import Ajv, { DefinedError, AnySchema } from 'ajv';
import { ExpressWinstonRequest } from 'express-winston';

import { buildErrorResponse } from '../utils/utils.js';

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
};

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
};

/**
 * WhitelistOptions interface
 *
 */
export interface WhitelistOptions {
  body?: string[];
  req?: string[];
  res?: string[];
}

/**
 * Validate schema middleware.
 *
 * @param  {AnySchema} schema
 */
export const whitelist = (options: WhitelistOptions) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const ewReq = req as ExpressWinstonRequest;
    if (options.body) {
      ewReq._routeWhitelists.body = options.body;
    }
    if (options.req) {
      ewReq._routeWhitelists.req = options.req;
    }
    if (options.res) {
      ewReq._routeWhitelists.res = options.res;
    }
    return next();
  };
};

/**
 * AllowedHttpMethods middleware.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const allowedHttpMethods = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const allowedMethods = ['POST', 'GET', 'PUT', 'DELETE'];
  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json(buildErrorResponse(['Method Not Allowed']));
  }
  return next();
};

/**
 * AllowedContentType middleware.
 *
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
export const allowedContentType = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ((req.method === 'POST' || req.method === 'PUT') && !req.is('json')) {
    return res
      .status(415)
      .json(buildErrorResponse(['Unsupported Content-Type']));
  }
  return next();
};
