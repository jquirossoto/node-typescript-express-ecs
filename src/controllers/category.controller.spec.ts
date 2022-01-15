import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { post, list, get, put, remove } from './category.controller';
import Category from './../models/category.model';
import * as categoryService from './../services/category.service';
import { buildSuccessResponse, buildErrorResponse } from './../utils/utils';
jest.mock('./../services/category.service');

describe('Category Controller', () => {
  describe('post', () => {
    it('Should respond 200 with created category', async () => {
      const newCategory: Category = {
        id: null,
        name: 'My category'
      };
      const req: Request = getMockReq({
        body: newCategory
      });
      const res: Response = getMockRes().res;
      const createdCategory: Category = {
        id: 1,
        name: 'My category'
      };
      // @ts-ignore
      categoryService.create.mockResolvedValue(createdCategory);

      await post(req, res);

      expect(categoryService.create).toHaveBeenCalledWith(newCategory);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(createdCategory));
    });

    it('Should respond 500 with error response', async () => {
      const newCategory: Category = {
        id: null,
        name: 'My category'
      };
      const req: Request = getMockReq({
        body: newCategory
      });
      const res: Response = getMockRes().res;
      const error: Error = new Error('Unable to process request');
      // @ts-ignore
      categoryService.create.mockRejectedValue(error);

      await post(req, res);

      expect(categoryService.create).toHaveBeenCalledWith(newCategory);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
    });
  });

  describe('list', () => {
    it('Should responde 200 with list of categories', async () => {
      const req: Request = getMockReq();
      const res: Response = getMockRes().res;
      const foundCategories: Category[] = [
        {
          id: 1,
          name: 'My category'
        },
        {
          id: 2,
          name: 'Second category'
        }
      ];
      // @ts-ignore
      categoryService.list.mockResolvedValue(foundCategories);

      await list(req, res);

      expect(categoryService.list).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(foundCategories));
    });

    it('Should respond 500 with an error response', async () => {
      const req: Request = getMockReq();
      const res: Response = getMockRes().res;
      const error: Error = new Error('Unable to process request');
      // @ts-ignore
      categoryService.list.mockRejectedValue(error);

      await list(req, res);

      expect(categoryService.list).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
    });
  });

  describe('get', () => {
    it('Should respond 200 with a category', async () => {
      const req: Request = getMockReq({
        params: {
          id: 1
        }
      });
      const res: Response = getMockRes().res;
      const foundCategory: Category = {
        id: 1,
        name: 'My category'
      };
      // @ts-ignore
      categoryService.get.mockResolvedValue(foundCategory);

      await get(req, res);

      expect(categoryService.get).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(foundCategory));
    });

    it('Should respond 200 without category', async () => {
      const req: Request = getMockReq({
        params: {
          id: 999
        }
      });
      const res: Response = getMockRes().res;
      // @ts-ignore
      categoryService.get.mockResolvedValue(null);

      await get(req, res);

      expect(categoryService.get).toHaveBeenCalledWith(999);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(null));
    });

    it('Should respond 500 with error response', async () => {
      const req: Request = getMockReq({
        params: {
          id: 998
        }
      });
      const res: Response = getMockRes().res;
      const error: Error = new Error('Unable to process request');
      // @ts-ignore
      categoryService.get.mockRejectedValue(error);

      await get(req, res);

      expect(categoryService.get).toHaveBeenCalledWith(998);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
    });
  });

  describe('put', () => {
    it('Should respond 200 with updated category', async () => {
      const dataToPatch: Category = {
        id: null,
        name: 'Updated category'
      };
      const req: Request = getMockReq({
        params: {
          id: 1
        },
        body: dataToPatch
      });
      const res: Response = getMockRes().res;
      const patchedCategory: Category = {
        id: 1,
        name: 'Updated category'
      };
      // @ts-ignore
      categoryService.update.mockResolvedValue(patchedCategory);

      await put(req, res);

      expect(categoryService.update).toHaveBeenCalledWith(1, dataToPatch);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(patchedCategory));
    });

    it('Should respond 500 with error response', async () => {
      const dataToPatch: Category = {
        id: null,
        name: 'Updated category'
      };
      const req: Request = getMockReq({
        params: {
          id: 1
        },
        body: dataToPatch
      });
      const res: Response = getMockRes().res;
      const error: Error = new Error('Unable to process request');
      // @ts-ignore
      categoryService.update.mockRejectedValue(error);

      await put(req, res);

      expect(categoryService.update).toHaveBeenCalledWith(1, dataToPatch);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
    });
  });

  describe('remove', () => {
    it('Should respond 200', async () => {
      const req: Request = getMockReq({
        params: {
          id: 1
        }
      });
      const res: Response = getMockRes().res;
      const deletedCategory: Category = {
        id: 1,
        name: 'My category'
      };
      // @ts-ignore
      categoryService.remove.mockResolvedValue(deletedCategory);

      await remove(req, res);

      expect(categoryService.remove).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(null));
    });

    it('Should respond 500', async () => {
      const req: Request = getMockReq({
        params: {
          id: 1
        }
      });
      const res: Response = getMockRes().res;
      const error: Error = new Error('Unable to process request');
      // @ts-ignore
      categoryService.remove.mockRejectedValue(error);

      await remove(req, res);

      expect(categoryService.remove).toHaveBeenCalledWith(1);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
    });
  });
});
