import { Request, Response } from 'express';

import { Pet } from './../models/pet.model';
import * as petService from './../services/pet.service';
import * as apiUtils from './../utils/api.utils';

export async function post(req: Request, res: Response) {
    try {
        const pet: Pet = await petService.create(req.body);
        res.json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}

export async function list(req: Request, res: Response) {
    try {
        const categories: Pet[] = await petService.list();
        res.json(apiUtils.buildSuccessResponse(categories));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}

export async function get(req: Request, res: Response) {
    try {
        const pet: Pet | null = await petService.get(+req.params.id);
        res.json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}

export async function patch(req: Request, res: Response) {
    try {
        const pet: Pet = await petService.update(+req.params.id, req.body);
        res.json(apiUtils.buildSuccessResponse(pet));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const pet: Pet = await petService.remove(+req.params.id);
        res.json(apiUtils.buildSuccessResponse(null));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}
