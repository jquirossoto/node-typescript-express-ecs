import { PrismaClient } from "@prisma/client";
import { Category } from "./../models/category.model";

const prisma = new PrismaClient();

export function create(category: Category): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.create({ data: category}).then((data: Category) => {
            resolve(data);
        }).catch((error) => {
            reject(new Error('Unable to process request'));
        });
    });
}

export function findUnique(id: number): Promise<Category | null> {
    return new Promise<Category | null>((resolve, reject) => {
        prisma.category.findUnique({ where: { id } }).then((data: Category | null) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error('Unable to process request'));
        });
    });
}

export function findMany(): Promise<Category[]> {
    return new Promise<Category[]>((resolve, reject) => {
        prisma.category.findMany().then((data: Category[]) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error('Unable to process request'));
        });
    });
}

export function update(id: number, category: Category): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.update({ where: { id }, data: category }).then((data: Category) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error('Unable to process request'));
        });
    });
}

export function remove(id: number): Promise<Category> {
    return new Promise<Category>((resolve, reject) => {
        prisma.category.delete({ where: { id } }).then((data: Category) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error('Unable to process request'));
        });
    });
}