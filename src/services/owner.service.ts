import * as repo from './../repositories/owner.repository';
import Owner from '../models/owner.model';

export const create = async (owner: Owner) => {
    return await repo.create(owner);
}

export const list = async () => {
    return await repo.findMany();
}

export const get = async (id: number) => {
    return await repo.findUnique(id);   
}

export const update = async (id: number, owner: Owner) => {
    return await repo.update(id, owner);
}

export const remove = async (id: number) => {
    return await repo.remove(id);
}
