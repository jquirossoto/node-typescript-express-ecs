import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

import Owner from '../models/owner.model';
import * as ownerService from './../services/owner.service';
import { post, list, get, patch, remove } from './owner.controller';
import { buildErrorResponse, buildSuccessResponse } from '../utils/api.utils';

jest.mock('./../services/owner.service');


describe('Owner controller', () => {

    describe('post', () => {

        it('Should respond 200 with created owner', async () => {
            const newOwner: Owner = {
                id: null,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identification_number: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const req: Request = getMockReq({
                body: newOwner
            });
            const res: Response = getMockRes().res;
            const createdOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identification_number: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            // @ts-ignore
            ownerService.create.mockResolvedValue(createdOwner);

            await post(req, res);

            expect(ownerService.create).toHaveBeenCalledWith(newOwner);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(createdOwner));
        });

        it('Should respond 500 with error response', async () => {
            const newOwner: Owner = {
                id: null,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identification_number: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const req: Request = getMockReq({
                body: newOwner
            });
            const res: Response = getMockRes().res;
            const error: Error = new Error('Unable to process request');
            // @ts-ignore
            ownerService.create.mockRejectedValue(error);

            await post(req, res);

            expect(ownerService.create).toHaveBeenCalledWith(newOwner);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
        });

    });

    describe('list', () => {

        it('Should responde 200 with list of owners', async () => {
            const req: Request = getMockReq();
            const res: Response = getMockRes().res;
            const foundOwners: Owner[] = [
                {
                    id: 1,
                    firstName: 'Jane',
                    middleInitial: 'M',
                    lastName: 'Doe',
                    identification_number: '109876543',
                    address: {
                        street: '995 Huel Curve',
                        buildingNumber: 'Suite 204',
                        city: 'Grimesview',
                        state: 'Bilzen',
                        countryCode: 'US',
                        postalCode: '65888-1483'
                    }
                },
                {
                    id: 2,
                    firstName: 'John',
                    middleInitial: 'M',
                    lastName: 'Doe',
                    identification_number: '109876544',
                    address: {
                        street: '995 Huel Curve',
                        buildingNumber: 'Suite 204',
                        city: 'Grimesview',
                        state: 'Bilzen',
                        countryCode: 'US',
                        postalCode: '65888-1483'
                    }
                }
            ];
            // @ts-ignore
            ownerService.list.mockResolvedValue(foundOwners);

            await list(req, res);

            expect(ownerService.list).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(foundOwners));
        });

        it('Should respond 500 with an error response', async () => {
            const req: Request = getMockReq();
            const res: Response = getMockRes().res;
            const error: Error = new Error('Unable to process request');
            // @ts-ignore
            ownerService.list.mockRejectedValue(error);

            await list(req, res);

            expect(ownerService.list).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
        });

    });

    describe('get', () => {

        it('Should respond 200 with a owner', async () => {
            const req: Request = getMockReq({
                params: {
                    id: 1
                }
            });
            const res: Response = getMockRes().res;
            const foundOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identification_number: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            // @ts-ignore
            ownerService.get.mockResolvedValue(foundOwner);

            await get(req, res);

            expect(ownerService.get).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(foundOwner));
        });

        it('Should respond 200 without owner', async () => {
            const req: Request = getMockReq({
                params: {
                    id: 999
                }
            });
            const res: Response = getMockRes().res;
            // @ts-ignore
            ownerService.get.mockResolvedValue(null);

            await get(req, res);

            expect(ownerService.get).toHaveBeenCalledWith(999);
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
            ownerService.get.mockRejectedValue(error);

            await get(req, res);

            expect(ownerService.get).toHaveBeenCalledWith(998);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
        });

    });

    describe('patch', () => {

        it('Should respond 200 with patched owner', async () => {
            const dataToPatch: Owner = {
                id: null,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identification_number: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const req: Request = getMockReq({
                params: {
                    id: 1
                },
                body: dataToPatch
            });
            const res: Response = getMockRes().res;
            const patchedOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identification_number: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            // @ts-ignore
            ownerService.update.mockResolvedValue(patchedOwner);

            await patch(req, res);

            expect(ownerService.update).toHaveBeenCalledWith(1, dataToPatch);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(buildSuccessResponse(patchedOwner));
        });

        it('Should respond 500 with error response', async () => {
            const dataToPatch: Owner = {
                id: null,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identification_number: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const req: Request = getMockReq({
                params: {
                    id: 1,
                },
                body: dataToPatch
            });
            const res: Response = getMockRes().res;
            const error: Error = new Error('Unable to process request');
            // @ts-ignore
            ownerService.update.mockRejectedValue(error);

            await patch(req, res);

            expect(ownerService.update).toHaveBeenCalledWith(1, dataToPatch);
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
            const deletedOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identification_number: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            // @ts-ignore
            ownerService.remove.mockResolvedValue(deletedOwner);

            await remove(req, res);

            expect(ownerService.remove).toHaveBeenCalledWith(1);
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
            ownerService.remove.mockRejectedValue(error);

            await remove(req, res);

            expect(ownerService.remove).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(buildErrorResponse([error.message]));
        });

    });

});