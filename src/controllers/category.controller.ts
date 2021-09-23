import { Request, Response } from 'express';

import { Category } from './../models/category.model';
import * as categoryService from './../services/category.service';
import * as apiUtils from './../utils/api.utils';

export async function post(req: Request, res: Response) {
    try {
        const category: Category = await categoryService.create(req.body);
        res.status(200).json(apiUtils.buildSuccessResponse(category));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse((error as Error).message));
    }
}

export async function list(req: Request, res: Response) {
    try {
        const categories: Category[] = await categoryService.list();
        res.json(apiUtils.buildSuccessResponse(categories));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}

export async function get(req: Request, res: Response) {
    try {
        const category: Category | null = await categoryService.get(+req.params.id);
        res.json(apiUtils.buildSuccessResponse(category));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}

export async function patch(req: Request, res: Response) {
    try {
        const category: Category = await categoryService.update(+req.params.id, req.body);
        res.json(apiUtils.buildSuccessResponse(category));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const category: Category = await categoryService.remove(+req.params.id);
        res.json(apiUtils.buildSuccessResponse(null));
    } catch (error) {
        res.status(500).json(apiUtils.buildErrorResponse(error.toString()));
    }
}
