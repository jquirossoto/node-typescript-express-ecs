import * as repo from './../repositories/pet.repository';
import { Pet } from './../models/pet.model';

export const create = async (pet: Pet): Promise<Pet> => {
    return await repo.create(pet);
}

export const list = async (): Promise<Pet[]> => {
    return await repo.findMany();
}

export const get = async (id: number): Promise<Pet | null> => {
    return await repo.findUnique(id);
}

export const update = async (id: number, pet: Pet): Promise<Pet> => {
    return await repo.update(id, pet);
}

export const remove = async (id: number): Promise<Pet> => {
    return await repo.remove(id);
}