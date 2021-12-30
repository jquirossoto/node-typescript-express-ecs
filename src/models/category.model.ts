/**
 * @file Category model.
 * @author jquirossoto
 */

import { Category as PrismaCategory, Prisma } from '@prisma/client';

export default class Category {

    id: number | null;
    name: string;

    constructor(id: number | null, name: string) {
        this.id = id;
        this.name = name;
    }

    static toCreateInput = (category: Category): Prisma.CategoryCreateInput => {
        return {
            name: category.name
        };
    };

    static toUpdateInput = (category: Category): Prisma.CategoryUpdateInput => {
        return {
            name: category.name
        };
    };

    static toModel (category: null): null;
    static toModel (category: PrismaCategory | null): Category;
    static toModel (categories: PrismaCategory[]): Category[];
    
    static toModel (category: PrismaCategory | PrismaCategory[] | null): Category | Category[] | null {
        let result: Category | Category[] | null;
        if (Array.isArray(category)) {
            result = [];
            for (let i = 0; i < category.length; i++) {
                result.push(new Category(category[i].id, category[i].name));
            }
        } else {
            if (category) {
                result = new Category(category.id, category.name);
            } else {
                result = null;
            }
        }
        return result;
    }
}