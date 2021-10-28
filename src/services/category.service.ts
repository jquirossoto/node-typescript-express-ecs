import * as repo from './../repositories/category.repository';
import { Category } from './../models/category.model';

export const create = async (category: Category): Promise<Category> => {
    return await repo.create(category);
}

export const list = async (): Promise<Category[]> => {
    return await repo.findMany();
}

export const get = async (id: number): Promise<Category | null> => {
    return await repo.findUnique(id);
}

export const update = async (id: number, category: Category): Promise<Category> => {
    return await repo.update(id, category);
}

export const remove = async (id: number): Promise<Category> => {
    return await repo.remove(id);
}