import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express'

import { post, list, get, patch, remove } from './category.controller';
import { Category } from './../models/category.model';
import * as categoryService from './../services/category.service';
import { buildSuccessResponse, buildErrorResponse } from './../utils/api.utils';

jest.mock('./../services/category.service');

beforeEach(() => {
    getMockRes();
});

describe('Category Controller', () => {

    describe('post()', () => {

        it('Should respond 200 with created category', async () => {
            const req: Request = getMockReq({
                body: {
                    name: 'My category'
                }
            });
            const createdCategory: Category = {
                id: 1,
                name: 'My category'
            };
            const responseData = buildSuccessResponse(createdCategory);
            const { res } = getMockRes();
            //@ts-ignore
            categoryService.create.mockResolvedValue(createdCategory);
            await post(req, res);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(responseData);
        });

        it('Should respond 500 with error response', async () => {
            const req: Request = getMockReq({
                body: {
                    name: 'My category'
                }
            });
            const error: Error = new Error('Unable to process request');
            const responseData = buildErrorResponse(error.message);
            const { res } = getMockRes();
            //@ts-ignore
            categoryService.create.mockRejectedValue(error);
            await post(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(responseData);
        });

    });

});