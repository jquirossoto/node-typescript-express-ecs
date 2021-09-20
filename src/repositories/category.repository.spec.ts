import { prismaMock } from './../../prisma/singleton';

import { create } from './category.repository';
import { Category } from './../models/category.model'

describe('Category Repository', () => {
    describe('create()', () => {
        it('Should create a category', async () => {
            const category: Category = {
                id: 1,
                name: 'My category'
            };
            /* @ts-ignore */
            prismaMock.category.create.mockResolvedValue(category);
            await expect(create(category)).resolves.toEqual({
                ...category
            });
        });
    });
});