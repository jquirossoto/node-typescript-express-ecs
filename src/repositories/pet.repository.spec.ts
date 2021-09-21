import { Pet as PrismaPet } from '@prisma/client';
import { prismaMock } from './../../prisma/singleton';

import { create, findUnique, findMany, update, remove } from './pet.repository';
import { Pet } from './../models/pet.model';

describe('Pet Repository', () => {

    describe('create()', () => {

        it('Should create a pet', async () => {
            const newPet: Pet = {
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const createdPet: PrismaPet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const returnedPet: Pet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            /* @ts-ignore */
            prismaMock.pet.create.mockResolvedValue(createdPet);
            await expect(create(newPet)).resolves.toEqual(returnedPet);
            expect(prismaMock.pet.create).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when creating one pet', async () => {
            const newPet: Pet = {
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            prismaMock.pet.create.mockRejectedValue(new Error('Unable to process request'));
            await expect(create(newPet)).rejects.toThrow(Error);
        });

    });


    describe('findUnique()', () => {

        it('Should find one pet', async () => {
            const foundPet: PrismaPet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const returnedPet: Pet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            prismaMock.pet.findUnique.mockResolvedValue(foundPet);
            await expect(findUnique(1)).resolves.toEqual(returnedPet);
            expect(prismaMock.pet.findUnique).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when finding one pet', async () => {
            prismaMock.pet.findUnique.mockRejectedValue(new Error('Unable to process request'));
            await expect(findUnique(1)).rejects.toThrow(Error);
        });

    });


    describe('findMany()', () => {

        it('Should find multiple categories', async () => {
            const foundPets: PrismaPet [] = [
                {
                    id: 1,
                    name: 'My pet',
                    status: 'AVAILABLE',
                    category_id: 1
                },
                {
                    id: 2,
                    name: 'My second pet',
                    status: 'AVAILABLE',
                    category_id: 1
                }
            ];
            const returnedPets: PrismaPet [] = [
                {
                    id: 1,
                    name: 'My pet',
                    status: 'AVAILABLE',
                    category_id: 1
                },
                {
                    id: 2,
                    name: 'My second pet',
                    status: 'AVAILABLE',
                    category_id: 1
                }
            ];
            /* @ts-ignore */
            prismaMock.pet.findMany.mockResolvedValue(foundPets);
            await expect(findMany()).resolves.toEqual(returnedPets);
            expect(prismaMock.pet.findMany).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when finding multiple categories', async () => {
            prismaMock.pet.findMany.mockRejectedValue(new Error('Unable to process request'));
            await expect(findMany()).rejects.toThrow(Error);
        });

    });

    describe('update()', () => {

        it('Should update a pet', async () => {
            const updatedPet: PrismaPet = {
                id: 1,
                name: 'Updated pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const returnedPet: Pet = {
                id: 1,
                name: 'Updated pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const dataToUpdate: Pet = {
                name: 'Updated pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            prismaMock.pet.update.mockResolvedValue(updatedPet);
            await expect(update(1, dataToUpdate)).resolves.toEqual(returnedPet);
            expect(prismaMock.pet.update).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when updating a pet', async () => {
            const dataToUpdate: Pet = {
                name: 'Updated pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            prismaMock.pet.update.mockRejectedValue(new Error('Unable to process request'));
            await expect(update(1, dataToUpdate)).rejects.toThrow(Error);
        });

    });

    describe('remove()', () => {

        it('Should delete a pet', async () => {
            const deletedPet: PrismaPet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            const returnedPet: Pet = {
                id: 1,
                name: 'My pet',
                status: 'AVAILABLE',
                category_id: 1
            };
            prismaMock.pet.delete.mockResolvedValue(deletedPet);
            await expect(remove(1)).resolves.toEqual(returnedPet);
            expect(prismaMock.pet.delete).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when deleting pet', async () => {
            prismaMock.pet.delete.mockRejectedValue(new Error('Unable to process request'));
            await expect(remove(1)).rejects.toThrow(Error);
        });

    });

});