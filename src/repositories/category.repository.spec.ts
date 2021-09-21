import { Category as PrismaCategory } from '@prisma/client';
import { prismaMock } from './../../prisma/singleton';

import { create, findUnique, findMany } from './category.repository';
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

    });

});