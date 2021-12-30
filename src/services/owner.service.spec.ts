import { create, get, list, update, remove } from './owner.service';
import Owner from './../models/owner.model';
import * as ownerRepo from './../repositories/owner.repository';

jest.mock('./../repositories/owner.repository');

describe('Owner Service', () => {

    describe('create()', () => {

        it('Should create a owner', async () => {
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
            /* @ts-ignore */
            ownerRepo.create.mockResolvedValue(createdOwner);
            await expect(create(newOwner)).resolves.toEqual(createdOwner);
            expect(ownerRepo.create).toHaveBeenCalledTimes(1);
        });

    });

    describe('list()', () => {

        it('Should list owners', async () => {
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
                }
            ];
            /* @ts-ignore */
            ownerRepo.findMany.mockResolvedValue(foundOwners);
            await expect(list()).resolves.toEqual(foundOwners);
            expect(ownerRepo.create).toHaveBeenCalledTimes(1);
        });

    });

    describe('get()', () => {

        it('Should find a owner by id', async () => {
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
            /* @ts-ignore */
            ownerRepo.findUnique.mockResolvedValue(foundOwner);

            await expect(get(1)).resolves.toEqual(foundOwner);

            expect(ownerRepo.findUnique).toHaveBeenCalledTimes(1);
        });

    });

    describe('update()', () => {

        it('Should update a owner', async () => {
            const dataToUpdate: Owner = {
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
            const updatedOwner: Owner = {
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
            /* @ts-ignore */
            ownerRepo.update.mockResolvedValue(updatedOwner);

            await expect(update(1, dataToUpdate)).resolves.toEqual(updatedOwner);

            expect(ownerRepo.update).toHaveBeenCalledTimes(1);
        });

    });

    describe('remove()', () => {

        it('Should delete a owner by id', async () => {
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
            /* @ts-ignore */
            ownerRepo.remove.mockResolvedValue(deletedOwner);

            await expect(remove(1)).resolves.toEqual(deletedOwner);

            expect(ownerRepo.remove).toHaveBeenCalledTimes(1);
        });

    });

});