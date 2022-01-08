import { prismaMock } from './../../prisma/singleton';

import { create, findUnique, findMany, update, remove } from './owner.repository';
import Owner, { GeneratedOwner } from './../models/owner.model';
import { Address } from '@prisma/client';

describe('Owner Repository', () => {

    describe('create()', () => {

        it('Should create a owner', async () => {
            const newOwner: Owner = {
                id: null,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const createdOwner: GeneratedOwner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
                addressId: 1,
                address: {
                    id: 1,
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const returnedOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
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
            prismaMock.owner.create.mockResolvedValue(createdOwner);

            await expect(create(newOwner)).resolves.toEqual(returnedOwner);

            expect(prismaMock.owner.create).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when creating one owner', async () => {
            const newOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            prismaMock.owner.create.mockRejectedValue(new Error('Unable to process request'));

            await expect(create(newOwner)).rejects.toThrow(Error);

            expect(prismaMock.owner.create).toHaveBeenCalledTimes(1);
        });

    });


    describe('findUnique()', () => {

        it('Should find one owner', async () => {
            const foundOwner: GeneratedOwner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
                addressId: 1,
                address: {
                    id: 1,
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const returnedOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
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
            prismaMock.owner.findUnique.mockResolvedValue(foundOwner);

            await expect(findUnique(1)).resolves.toEqual(returnedOwner);

            expect(prismaMock.owner.findUnique).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when finding one owner', async () => {
            prismaMock.owner.findUnique.mockRejectedValue(new Error('Unable to process request'));
            await expect(findUnique(1)).rejects.toThrow(Error);
            expect(prismaMock.owner.findUnique).toHaveBeenCalledTimes(1);
        });

    });


    describe('findMany()', () => {

        it('Should find multiple categories', async () => {
            const foundOwners: GeneratedOwner [] = [
                {
                    id: 1,
                    firstName: 'Jane',
                    middleInitial: 'M',
                    lastName: 'Doe',
                    identificationNumber: '109876543',
                    addressId: 1,
                    address: {
                        id: 1,
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
                    middleInitial: 'P',
                    lastName: 'Doe',
                    identificationNumber: '109876541',
                    addressId: 2,
                    address: {
                        id: 2,
                        street: '995 Huel Curve',
                        buildingNumber: 'Suite 204',
                        city: 'Grimesview',
                        state: 'Bilzen',
                        countryCode: 'US',
                        postalCode: '65888-1483'
                    }
                }
            ];
            const returnedOwners: Owner [] = [
                {
                    id: 1,
                    firstName: 'Jane',
                    middleInitial: 'M',
                    lastName: 'Doe',
                    identificationNumber: '109876543',
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
                    middleInitial: 'P',
                    lastName: 'Doe',
                    identificationNumber: '109876541',
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
            prismaMock.owner.findMany.mockResolvedValue(foundOwners);

            await expect(findMany()).resolves.toEqual(returnedOwners);

            expect(prismaMock.owner.findMany).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when finding multiple categories', async () => {
            prismaMock.owner.findMany.mockRejectedValue(new Error('Unable to process request'));
            await expect(findMany()).rejects.toThrow(Error);
            expect(prismaMock.owner.findMany).toHaveBeenCalledTimes(1);
        });

    });

    describe('update()', () => {

        it('Should update a owner', async () => {
            const updatedOwner: GeneratedOwner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
                addressId: 1,
                address: {
                    id: 1,
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const returnedOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            const dataToUpdate: Owner = {
                id: null,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
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
            prismaMock.owner.update.mockResolvedValue(updatedOwner);

            await expect(update(1, dataToUpdate)).resolves.toEqual(returnedOwner);

            expect(prismaMock.owner.update).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when updating a owner', async () => {
            const dataToUpdate: Owner = {
                id: null,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
                address: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            };
            prismaMock.owner.update.mockRejectedValue(new Error('Unable to process request'));

            await expect(update(1, dataToUpdate)).rejects.toThrow(Error);

            expect(prismaMock.owner.update).toHaveBeenCalledTimes(1);
        });

    });

    describe('remove()', () => {

        it('Should delete a owner', async () => {
            const deletedAddress: Address = {
                id: 1,
                street: '995 Huel Curve',
                buildingNumber: 'Suite 204',
                city: 'Grimesview',
                state: 'Bilzen',
                countryCode: 'US',
                postalCode: '65888-1483'
            };
            const deletedOwner: GeneratedOwner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
                addressId: 1,
                address: deletedAddress
            };
            const returnedOwner: Owner = {
                id: 1,
                firstName: 'Jane',
                middleInitial: 'M',
                lastName: 'Doe',
                identificationNumber: '109876543',
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
            prismaMock.owner.delete.mockResolvedValue(deletedOwner);
            // @ts-ignore
            prismaMock.address.delete.mockResolvedValue(deletedAddress);

            await expect(remove(1)).resolves.toEqual(returnedOwner);

            expect(prismaMock.address.delete).toHaveBeenCalledTimes(1);
            expect(prismaMock.owner.delete).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when deleting owner', async () => {
            prismaMock.owner.delete.mockRejectedValue(new Error('Unable to process request'));
            await expect(remove(1)).rejects.toThrow(Error);
            expect(prismaMock.owner.delete).toHaveBeenCalledTimes(1);
        });

    });

});