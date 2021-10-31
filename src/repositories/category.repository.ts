/**
 * @file Category repository.
 * @author jquirossoto
 */

import prisma from './../utils/client.prisma';
import Category from './../models/category.model';

/**
 * Creates a new Category.
 *
 * @param  {Category} category
 * @returns Promise
 */
export const create = (category: Category): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.create({ data: category }).then((data: Category) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

/**
 * Finds a Category by id.
 *
 * @param  {number} id
 * @returns Promise
 */
export const findUnique = (id: number): Promise<Category | null> => {
    return new Promise<Category | null>((resolve, reject) => {
        prisma.category.findUnique({ where: { id } }).then((data: Category | null) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

/**
 * Finds a list of Category.
 *
 * @returns Promise
 */
export const findMany = (): Promise<Category[]> => {
    return new Promise<Category[]>((resolve, reject) => {
        prisma.category.findMany().then((data: Category[]) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

/**
 * Updates a Category.
 *
 * @param  {number} id
 * @param  {Category} category
 * @returns Promise
 */
export const update = (id: number, category: Category): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.update({ where: { id }, data: category }).then((data: Category) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

/**
 * Deletes a Category.
 *
 * @param  {number} id
 * @returns Promise
 */
export const remove = (id: number): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.delete({ where: { id } }).then((data: Category) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}