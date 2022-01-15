/**
 * @file Category service.
 * @author jquirossoto
 */

import * as repo from './../repositories/category.repository.js';
import Category from './../models/category.model.js';

/**
 * Creates a new Category.
 *
 * @param  {Category} category
 * @returns Promise
 */
export const create = async (category: Category): Promise<Category> => {
  return await repo.create(category);
};

/**
 * Finds a list of Category.
 *
 * @returns Promise
 */
export const list = async (): Promise<Category[]> => {
  return await repo.findMany();
};

/**
 * Finds a Category by id.
 *
 * @param  {number} id
 * @returns Promise
 */
export const get = async (id: number): Promise<Category | null> => {
  return await repo.findUnique(id);
};

/**
 * Updates a Category.
 *
 * @param  {number} id
 * @param  {Category} category
 * @returns Promise
 */
export const update = async (id: number, category: Category): Promise<Category> => {
  return await repo.update(id, category);
};

/**
 * Deletes a Category.
 *
 * @param  {number} id
 * @returns Promise
 */
export const remove = async (id: number): Promise<Category> => {
  return await repo.remove(id);
};
