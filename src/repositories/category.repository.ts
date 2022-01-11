/**
 * @file Category repository.
 * @author jquirossoto
 */
import { Category as PrismaCategory } from '@prisma/client';

import prisma from '../utils/prisma.js';
import Category from './../models/category.model.js';

/**
 * Creates a new Category.
 *
 * @param  {Category} category
 * @returns Promise
 */
export const create = (category: Category): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.create({ data: Category.toCreateInput(category) }).then((data: PrismaCategory) => {
            resolve(Category.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
};

/**
 * Finds a Category by id.
 *
 * @param  {number} id
 * @returns Promise
 */
export const findUnique = (id: number): Promise<Category | null> => {
    return new Promise<Category | null>((resolve, reject) => {
        prisma.category.findUnique({ where: { id } }).then((data: PrismaCategory | null) => {
            resolve(Category.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
};

/**
 * Finds a list of Category.
 *
 * @returns Promise
 */
export const findMany = (): Promise<Category[]> => {
    return new Promise<Category[]>((resolve, reject) => {
        prisma.category.findMany().then((data: PrismaCategory[]) => {
            resolve(Category.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
};

/**
 * Updates a Category.
 *
 * @param  {number} id
 * @param  {Category} category
 * @returns Promise
 */
export const update = (id: number, category: Category): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.update({ where: { id }, data: Category.toUpdateInput(category) }).then((data: PrismaCategory) => {
            resolve(Category.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
};

/**
 * Deletes a Category.
 *
 * @param  {number} id
 * @returns Promise
 */
export const remove = (id: number): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.delete({ where: { id } }).then((data: PrismaCategory) => {
            resolve(Category.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
};