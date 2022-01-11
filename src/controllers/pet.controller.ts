/**
 * @file Pet controller.
 * @author jquirossoto
 */

import { Request, Response } from 'express';

import Pet from './../models/pet.model.js';
import * as petService from './../services/pet.service.js';
import * as apiUtils from '../utils/utils.js';

/**
 * Post handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const post = async (req: Request, res: Response) => {
    try {
        const pet: Pet = await petService.create(req.body);
        res.status(200).json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
};

/**
 * List handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const list = async (req: Request, res: Response) => {
    try {
        const categories: Pet[] = await petService.list();
        res.status(200).json(apiUtils.buildSuccessResponse(categories));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
};

/**
 * Get handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const get = async (req: Request, res: Response) => {
    try {
        const pet: Pet | null = await petService.get(+req.params.id);
        res.status(200).json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
};

/**
 * Patch handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const put = async (req: Request, res: Response) => {
    try {
        const pet: Pet = await petService.update(+req.params.id, req.body);
        res.status(200).json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
};

/**
 * Delete handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const remove = async (req: Request, res: Response) => {
    try {
        await petService.remove(+req.params.id);
        res.status(200).json(apiUtils.buildSuccessResponse(null));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
};