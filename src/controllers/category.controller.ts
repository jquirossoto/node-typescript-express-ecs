/**
 * @file Category controller.
 * @author jquirossoto
 */

import { Request, Response } from 'express';

import Category from './../models/category.model.js';
import * as categoryService from './../services/category.service.js';
import * as apiUtils from '../utils/utils.js';

/**
 * Post handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const post = async (req: Request, res: Response) => {
  try {
    const category: Category = await categoryService.create(req.body);
    res.status(200).json(apiUtils.buildSuccessResponse(category));
  } catch (error) {
    res
      .status(500)
      .json(apiUtils.buildErrorResponse([(error as Error).message]));
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
    const categories: Category[] = await categoryService.list();
    res.status(200).json(apiUtils.buildSuccessResponse(categories));
  } catch (error) {
    res
      .status(500)
      .json(apiUtils.buildErrorResponse([(error as Error).message]));
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
    const category: Category | null = await categoryService.get(+req.params.id);
    res.status(200).json(apiUtils.buildSuccessResponse(category));
  } catch (error) {
    res
      .status(500)
      .json(apiUtils.buildErrorResponse([(error as Error).message]));
  }
};

/**
 * Put handler.
 *
 * @param  {Request} req
 * @param  {Response} res
 */
export const put = async (req: Request, res: Response) => {
  try {
    const category: Category = await categoryService.update(
      +req.params.id,
      req.body
    );
    res.status(200).json(apiUtils.buildSuccessResponse(category));
  } catch (error) {
    res
      .status(500)
      .json(apiUtils.buildErrorResponse([(error as Error).message]));
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
    await categoryService.remove(+req.params.id);
    res.status(200).json(apiUtils.buildSuccessResponse(null));
  } catch (error) {
    res
      .status(500)
      .json(apiUtils.buildErrorResponse([(error as Error).message]));
  }
};
