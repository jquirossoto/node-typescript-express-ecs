import * as repo from './../repositories/pet.repository';
import { Pet } from './../models/pet.model';

export async function create(pet: Pet): Promise<Pet> {
    return await repo.create(pet);
}

export async function list(): Promise<Pet[]>  {
    return await repo.findMany();
}

export async function get(id: number): Promise<Pet | null> {
    return await repo.findUnique(id);
}

export async function update(id: number, pet: Pet): Promise<Pet> {
    return await repo.update(id, pet);
}

export async function remove(id: number): Promise<Pet> {
    return await repo.remove(id);
}
