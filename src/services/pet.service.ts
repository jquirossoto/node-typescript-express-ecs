/**
 * @file Pet service.
 * @author jquirossoto
 */

import * as repo from './../repositories/pet.repository.js';
import Pet from './../models/pet.model.js';

/**
 * Creates a new Pet.
 *
 * @param  {Pet} pet
 * @returns Promise
 */
export const create = async (pet: Pet): Promise<Pet> => {
    return await repo.create(pet);
};

/**
 * Finds a list of Pet.
 *
 * @returns Promise
 */
export const list = async (): Promise<Pet[]> => {
    return await repo.findMany();
};

/**
 * Finds a Pet by id.
 *
 * @param  {number} id
 * @returns Promise
 */
export const get = async (id: number): Promise<Pet | null> => {
    return await repo.findUnique(id);
};

/**
 * Updates a Pet.
 *
 * @param  {number} id
 * @param  {Pet} pet
 * @returns Promise
 */
export const update = async (id: number, pet: Pet): Promise<Pet> => {
    return await repo.update(id, pet);
};

/**
 * Deletes a Pet.
 *
 * @param  {number} id
 * @returns Promise
 */
export const remove = async (id: number): Promise<Pet> => {
    return await repo.remove(id);
};