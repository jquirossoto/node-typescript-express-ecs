import * as repo from './../repositories/category.repository';
import { Category } from './../models/category.model';

export async function create(category: Category): Promise<Category> {
    return await repo.create(category);
}

export async function list(): Promise<Category[]>  {
    return await repo.findMany();
}

export async function get(id: number): Promise<Category | null> {
    return await repo.findUnique(id);
}

export async function update(id: number, category: Category): Promise<Category> {
    return await repo.update(id, category);
}

export async function remove(id: number): Promise<Category> {
    return await repo.remove(id);
}
