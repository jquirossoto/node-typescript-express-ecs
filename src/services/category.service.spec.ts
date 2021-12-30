import { create, list, get, update, remove } from './category.service';
import Category from './../models/category.model';
import  * as categoryRepo from './../repositories/category.repository';

jest.mock('./../repositories/category.repository');

describe('Category Service', () => {

    describe('create()', () => {
        it('Should create a category', async () => {
            const newCategory: Category = {
                id: null,
                name: 'My category'
            };
            const createdCategory: Category = {
                id: 1,
                name: 'My Category'
            };
            /* @ts-ignore */
            categoryRepo.create.mockResolvedValue(createdCategory);
            await expect(create(newCategory)).resolves.toEqual(createdCategory);
            expect(categoryRepo.create).toHaveBeenCalledTimes(1);
        });
    });

    describe('list()', () => {

        it('Should list categories', async () => {
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
            /* @ts-ignore */
            categoryRepo.findMany.mockResolvedValue(foundCategories);
            await expect(list()).resolves.toEqual(foundCategories);
            expect(categoryRepo.findMany).toHaveBeenCalledTimes(1);
        });

    });

    describe('get()', () => {

        it('Should get one category', async () => {
            const foundCategory: Category = {
                id: 1,
                name: 'My category'
            };
            /* @ts-ignore */
            categoryRepo.findUnique.mockResolvedValue(foundCategory);
            await expect(get(1)).resolves.toEqual(foundCategory);
            expect(categoryRepo.findUnique).toHaveBeenCalledTimes(1);
        });

    });

    describe('update()', () => {

        it('Should update a category', async () => {
            const dataToUpdate: Category = {
                id: null,
                name: 'Updated category'
            };
            const updatedCategory: Category = {
                id: 1,
                name: 'Updated category'
            };
            /* @ts-ignore */
            categoryRepo.update.mockResolvedValue(updatedCategory);
            await expect(update(1, dataToUpdate)).resolves.toEqual(updatedCategory);
            expect(categoryRepo.update).toHaveBeenCalledTimes(1);
        });

    });

    describe('remove()', () => {

        it('Should delete a category', async () => {
            const deletedCategory: Category = {
                id: 1,
                name: 'Delete category'
            };
            /* @ts-ignore */
            categoryRepo.remove.mockResolvedValue(deletedCategory);
            await expect(remove(1)).resolves.toEqual(deletedCategory);
            expect(categoryRepo.remove).toHaveBeenCalledTimes(1);
        });

    });

});