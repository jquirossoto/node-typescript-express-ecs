import * as repo from './../repositories/pet.repository';
import { Pet } from './../models/Pet.model';

export async function create(category: Pet): Promise<Pet> {
    return await repo.create(category);
}

export async function list(): Promise<Pet[]>  {
    return await repo.findMany();
}

export async function get(id: number): Promise<Pet | null> {
    return await repo.findUnique(id);
}

export async function update(id: number, category: Pet): Promise<Pet> {
    return await repo.update(id, category);
}

export async function remove(id: number): Promise<Pet> {
    return await repo.remove(id);
}
