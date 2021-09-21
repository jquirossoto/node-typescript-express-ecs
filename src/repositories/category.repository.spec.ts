import { Category as PrismaCategory } from '@prisma/client';
import { prismaMock } from './../../prisma/singleton';

import { create, findUnique, findMany, update, remove } from './category.repository';
import { Category } from './../models/category.model';

describe('Category Repository', () => {

    describe('create()', () => {

        it('Should create a category', async () => {
            const newCategory: Category = {
                name: 'My category'
            };
            const createdCategory: PrismaCategory = {
                id: 1,
                name: 'My category'
            };
            const returnedCategory: Category = {
                id: 1,
                name: 'My category'
            };
            /* @ts-ignore */
            prismaMock.category.create.mockResolvedValue(createdCategory);
            await expect(create(newCategory)).resolves.toEqual(returnedCategory);
            expect(prismaMock.category.create).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when creating one category', async () => {
            const newCategory: Category = {
                name: 'My category'
            };
            prismaMock.category.create.mockRejectedValue(new Error('Unable to process request'));
            await expect(create(newCategory)).rejects.toThrow(Error);
            expect(prismaMock.category.create).toHaveBeenCalledTimes(1);
        });

    });


    describe('findUnique()', () => {

        it('Should find one category', async () => {
            const foundCategory: PrismaCategory = {
                id: 1,
                name: 'My category'
            };
            const returnedCategory: Category = {
                id: 1,
                name: 'My category'
            };
            prismaMock.category.findUnique.mockResolvedValue(foundCategory);
            await expect(findUnique(1)).resolves.toEqual(returnedCategory);
            expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when finding one category', async () => {
            prismaMock.category.findUnique.mockRejectedValue(new Error('Unable to process request'));
            await expect(findUnique(1)).rejects.toThrow(Error);
            expect(prismaMock.category.findUnique).toHaveBeenCalledTimes(1);
        });

    });

    describe('findMany()', () => {

        it('Should find multiple categories', async () => {
            const foundCategories: PrismaCategory [] = [
                {
                    id: 1,
                    name: 'My category'
                },
                {
                    id: 2,
                    name: 'My second category'
                }
            ];
            const returnedCategories: PrismaCategory [] = [
                {
                    id: 1,
                    name: 'My category'
                },
                {
                    id: 2,
                    name: 'My second category'
                }
            ];
            /* @ts-ignore */
            prismaMock.category.findMany.mockResolvedValue(foundCategories);
            await expect(findMany()).resolves.toEqual(returnedCategories);
            expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when finding multiple categories', async () => {
            prismaMock.category.findMany.mockRejectedValue(new Error('Unable to process request'));
            await expect(findMany()).rejects.toThrow(Error);
            expect(prismaMock.category.findMany).toHaveBeenCalledTimes(1);
        });

    });

    describe('update()', () => {

        it('Should update a category', async () => {
            const updatedCategory: PrismaCategory = {
                id: 1,
                name: 'Updated category'
            };
            const returnedCategory: Category = {
                id: 1,
                name: 'Updated category'
            };
            const dataToUpdate: Category = {
                name: 'Updated category'
            };
            prismaMock.category.update.mockResolvedValue(updatedCategory);
            await expect(update(1, dataToUpdate)).resolves.toEqual(returnedCategory);
            expect(prismaMock.category.update).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when updating a category', async () => {
            const dataToUpdate: Category = {
                name: 'Updated category'
            };
            prismaMock.category.update.mockRejectedValue(new Error('Unable to process request'));
            await expect(update(1, dataToUpdate)).rejects.toThrow(Error);
            expect(prismaMock.category.update).toHaveBeenCalledTimes(1);
        });

    });

    describe('remove()', () => {

        it('Should delete a category', async () => {
            const deletedCategory: PrismaCategory = {
                id: 1,
                name: 'My category'
            };
            const returnedCategory: Category = {
                id: 1,
                name: 'My category'
            };
            prismaMock.category.delete.mockResolvedValue(deletedCategory);
            await expect(remove(1)).resolves.toEqual(returnedCategory);
            expect(prismaMock.category.delete).toHaveBeenCalledTimes(1);
        });

        it('Should throw error when deleting category', async () => {
            prismaMock.category.delete.mockRejectedValue(new Error('Unable to process request'));
            await expect(remove(1)).rejects.toThrow(Error);
            expect(prismaMock.category.delete).toHaveBeenCalledTimes(1);
        });

    });

});
