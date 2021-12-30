/**
 * @file Health controller.
 * @author jquirossoto
 */

import { Request, Response } from 'express';

/**
 * List handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const list = async (req: Request, res: Response) => {
    res.status(200).send();
};