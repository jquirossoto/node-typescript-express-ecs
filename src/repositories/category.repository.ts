import prisma from './../utils/client.prisma';
import { Category } from './../models/category.model';


export const create = (category: Category): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.create({ data: category }).then((data: Category) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export const findUnique = (id: number): Promise<Category | null> => {
    return new Promise<Category | null>((resolve, reject) => {
        prisma.category.findUnique({ where: { id } }).then((data: Category | null) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export const findMany = (): Promise<Category[]> => {
    return new Promise<Category[]>((resolve, reject) => {
        prisma.category.findMany().then((data: Category[]) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export const update = (id: number, category: Category): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.update({ where: { id }, data: category }).then((data: Category) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export const remove = (id: number): Promise<Category> => {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.delete({ where: { id } }).then((data: Category) => {
            resolve(data);
        }).catch((err: Error) => {
            reject(err);
        });
    });
}