/**
 * @file Pet repository.
 * @author jquirossoto
 */
import { Pet as PrismaPet } from '@prisma/client';

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
        prisma.pet.create({ data: Pet.toCreateInput(pet) }).then((data: PrismaPet) => {
            resolve(Pet.toModel(data));
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
        prisma.pet.findUnique({ where: { id } }).then((data: PrismaPet | null) => {
            resolve(Pet.toModel(data));
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
        prisma.pet.findMany().then((data: PrismaPet[]) => {
            resolve(Pet.toModel(data));
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
        prisma.pet.update({ where: { id }, data: Pet.toUpdateInput(pet) }).then((data: PrismaPet) => {
            resolve(Pet.toModel(data));
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
        prisma.pet.delete({ where: { id } }).then((data: PrismaPet) => {
            resolve(Pet.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
}