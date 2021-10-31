/**
 * @file Pet repository.
 * @author jquirossoto
 */

import prisma from './../utils/client.prisma';
import Pet from './../models/pet.model';

/**
 * Creates a new Pet.
 *
 * @param  {Pet} pet
 * @returns Promise
 */
export const create = (pet: Pet): Promise<Pet> => {
    return new Promise<Pet>((resolve, reject) => {
        prisma.pet.create({ data: pet }).then((data: Pet) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

/**
 * Finds a Pet by id.
 *
 * @param  {number} id
 * @returns Promise
 */
export const findUnique = (id: number): Promise<Pet | null> => {
    return new Promise<Pet | null>((resolve, reject) => {
        prisma.pet.findUnique({ where: { id } }).then((data: Pet | null) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

/**
 * Finds a list of Pet.
 *
 * @returns Promise
 */
export const findMany = (): Promise<Pet[]> => {
    return new Promise<Pet[]>((resolve, reject) => {
        prisma.pet.findMany().then((data: Pet[]) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

/**
 * Updates a Pet.
 *
 * @param  {number} id
 * @param  {Pet} pet
 * @returns Promise
 */
export const update = (id: number, pet: Pet): Promise<Pet> => {
    return new Promise<Pet>((resolve, reject) => {
        prisma.pet.update({ where: { id }, data: pet }).then((data: Pet) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

/**
 * Deletes a Pet.
 *
 * @param  {number} id
 * @returns Promise
 */
export const remove = (id: number): Promise<Pet> => {
    return new Promise<Pet>((resolve, reject) => {
        prisma.pet.delete({ where: { id } }).then((data: Pet) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}