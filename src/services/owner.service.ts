/**
 * @file Owner service.
 * @author jquirossoto
 */

import Owner from './../models/owner.model.js';
import * as repo from '../repositories/owner.repository.js';

/**
 * Creates a new Owner.
 *
 * @param  {Category} category
 * @returns Promise
 */
export const create = async (owner: Owner) => {
  return await repo.create(owner);
};

/**
 * Finds a list of Owner.
 *
 * @returns Promise
 */
export const list = async () => {
  return await repo.findMany();
};

/**
 * Finds an Owner by id.
 *
 * @param  {number} id
 * @returns Promise
 */
export const get = async (id: number) => {
  return await repo.findUnique(id);
};

/**
 * Updates an Owner.
 *
 * @param  {number} id
 * @param  {Category} category
 * @returns Promise
 */
export const update = async (id: number, owner: Owner) => {
  return await repo.update(id, owner);
};

/**
 * Deletes an Owner.
 *
 * @param  {number} id
 * @returns Promise
 */
export const remove = async (id: number) => {
  return await repo.remove(id);
};
