import { Request, Response } from 'express';

import { Pet } from './../models/pet.model';
import * as petService from './../services/pet.service';
import * as apiUtils from './../utils/api.utils';

export const post = async (req: Request, res: Response) => {
    try {
        const pet: Pet = await petService.create(req.body);
        res.status(200).json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}
export const list = async (req: Request, res: Response) => {
    try {
        const categories: Pet[] = await petService.list();
        res.status(200).json(apiUtils.buildSuccessResponse(categories));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}

export const get = async (req: Request, res: Response) => {
    try {
        const pet: Pet | null = await petService.get(+req.params.id);
        res.status(200).json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}

export const patch = async (req: Request, res: Response) => {
    try {
        const pet: Pet = await petService.update(+req.params.id, req.body);
        res.status(200).json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const pet: Pet = await petService.remove(+req.params.id);
        res.status(200).json(apiUtils.buildSuccessResponse(null));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse([(error as Error).message]));
    }
}