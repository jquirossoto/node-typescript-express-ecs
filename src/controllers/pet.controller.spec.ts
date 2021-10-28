import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express'

import { post, list, get, patch, remove } from './pet.controller';
import { Pet } from './../models/pet.model';
import * as petService from './../services/pet.service';
import { buildSuccessResponse, buildErrorResponse } from './../utils/api.utils';

jest.mock('./../services/pet.service');

describe('Pet Controller', () => {
   
    describe('post', () => {
    
        it('Should respond 200 with create pet', async () => {
            const newPet: Pet = {
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const req: Request = getMockReq({
                body: newPet
            });
            const res: Response = getMockRes().res;
            const createdCategory: Pet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            //@ts-ignore
            petService.create.mockResolvedValue(createdCategory);

            await post(req, res);

            expect(petService.create).toHaveBeenCalledWith(newPet);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(createdCategory));
        });

        it('Should respond 500 with error response', async () => {
            const newPet: Pet = {
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const req: Request = getMockReq({
                body: newPet
            });
            const res: Response = getMockRes().res;
            const error: Error = new Error('Unable to process request');
            //@ts-ignore
            petService.create.mockRejectedValue(error);

            await post(req, res);

            expect(petService.create).toHaveBeenCalledWith(newPet);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
        });
        
    });

    describe('list', () => {
        
        it('Should respond 200 with found pets', async () => {
            const foundPets: Pet[] = [
                {
                    id: 1,
                    name: 'My pet',
                    status: 'AVAILABLE',
                    category_id: 1
                },
                {
                    id: 2,
                    name: 'Second pet',
                    status: 'SOLD',
                    category_id: 1
                }
            ];
            const req: Request = getMockReq();
            const res: Response = getMockRes().res;
            //@ts-ignore
            petService.list.mockResolvedValue(foundPets);

            await list(req, res);

            expect(petService.list).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(foundPets));
        });

        it('Should respond 200 with no found pets', async () => {
            const foundPets: Pet[] = [];
            const req: Request = getMockReq();
            const res: Response = getMockRes().res;
            //@ts-ignore
            petService.list.mockResolvedValue(foundPets);
            
            await list(req, res);

            expect(petService.list).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(foundPets));
        });

        it('Should respond 500 with error response', async () => {
            const req: Request = getMockReq();
            const res: Response = getMockRes().res;
            const error: Error = new Error('Unable to process request');
            //@ts-ignore
            petService.list.mockRejectedValue(error);

            await list(req, res);

            expect(petService.list).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
        });

    });

    describe('get', () => {

        it('Shoud respond 200 with found pet', async () => {
            const newPet: Pet = {
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const req: Request = getMockReq({
                params: {
                    id: 1
                }
            });
            const res: Response = getMockRes().res;
            const foundPet: Pet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            //@ts-ignore
            petService.get.mockResolvedValue(foundPet);

            await get(req, res);

            expect(petService.get).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(foundPet));
        });

        it('Should respond 200 with no pet', async () => {
            const req: Request = getMockReq({
                params: {
                    id: 999
                }
            });
            const res: Response = getMockRes().res;
            const foundPet: Pet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            //@ts-ignore
            petService.get.mockResolvedValue(null);

            await get(req, res);

            expect(petService.get).toHaveBeenCalledWith(999);
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
            //@ts-ignore
            petService.get.mockRejectedValue(error);

            await get(req, res);

            expect(petService.get).toHaveBeenCalledWith(998);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
        });

    });

    describe('patch', () => {

        it('Should respond 200 with patched pet', async () => {
            const dataToPatch: Pet = {
               name: 'Patched pet',
               status: 'PENDING',
               category_id: 2
            };
            const req: Request = getMockReq({
                params: {
                    id: 1
                },
                body: dataToPatch
            });
            const res: Response = getMockRes().res;
            const patchedPet: Pet = {
                id: 1,
                name: 'Patched pet',
                status: 'PENDING',
                category_id: 2
            };
            //@ts-ignore
            petService.update.mockResolvedValue(patchedPet);

            await patch(req, res);

            expect(petService.update).toHaveBeenCalledWith(1, dataToPatch);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(patchedPet));
        });

        it('Should respond 500 with error response', async () => {
            const dataToPatch: Pet = {
                name: 'Patched pet',
                status: 'PENDING',
                category_id: 2
             };
            const req: Request = getMockReq({
                params: {
                    id: 1
                },
                body: dataToPatch
            });
            const res: Response = getMockRes().res;
            const error: Error = new Error('Unable to process request');
            //@ts-ignore
            petService.update.mockRejectedValue(error);

            await patch(req, res);

            expect(petService.update).toHaveBeenCalledWith(1, dataToPatch);
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
            const deletedPet: Pet = {
                id: 1,
                name: 'Deleted pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            //@ts-ignore
            petService.remove.mockResolvedValue(deletedPet);

            await remove(req, res);

            expect(petService.remove).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(null));
        });

        it('Should responde 500 with error response', async () => {
            const req: Request = getMockReq({
                params: {
                    id: 1
                }
            });
            const res: Response = getMockRes().res;
            const error: Error = new Error('Unable to process request');
            //@ts-ignore
            petService.remove.mockRejectedValue(error)

            await remove(req, res);

            expect(petService.remove).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
        });

    });
    
});