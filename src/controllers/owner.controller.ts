import { Request, Response } from 'express';

import Owner from './../models/owner.model';
import * as ownerService from './../services/owner.service';
import * as apiUtils from './../utils/api.utils';

export const post = async (req: Request, res: Response) => {
    try {
        const owner: Owner = await ownerService.create(req.body);
        res.status(200).json(apiUtils.buildSuccessResponse(owner));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}

export const list = async (req: Request, res: Response) => {
    try {
        const owners: Owner[] = await ownerService.list();
        res.status(200).json(apiUtils.buildSuccessResponse(owners));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]))
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const owner: Owner = await ownerService.get(+req.params.id);
        res.status(200).json(apiUtils.buildSuccessResponse(owner));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}

export const patch = async (req: Request, res: Response) => {
    try {
        const owner: Owner = await ownerService.update(+req.params.id, req.body);
        res.status(200).json(apiUtils.buildSuccessResponse(owner)); 
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        await ownerService.remove(+req.params.id);
        res.status(200).json(apiUtils.buildSuccessResponse(null)); 
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}