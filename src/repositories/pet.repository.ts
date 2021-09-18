import { PrismaClient } from '@prisma/client';
import { Pet } from './../models/pet.model';

const prisma = new PrismaClient();

export function create(pet: Pet): Promise<Pet> {
    return new Promise<Pet>((resolve, reject) => {
        prisma.pet.create({ data: pet}).then((data: Pet) => {
            resolve(data);
        }).catch((error) => {
            reject(new Error('Unable to process request'));
        });
    });
}

export function findUnique(id: number): Promise<Pet | null> {
    return new Promise<Pet | null>((resolve, reject) => {
        prisma.pet.findUnique({ where: { id } }).then((data: Pet | null) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error('Unable to process request'));
        });
    });
}

export function findMany(): Promise<Pet[]> {
    return new Promise<Pet[]>((resolve, reject) => {
        prisma.pet.findMany().then((data: Pet[]) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error('Unable to process request'));
        });
    });
}

export function update(id: number, pet: Pet): Promise<Pet> {
    return new Promise<Pet>((resolve, reject) => {
        prisma.pet.update({ where: { id }, data: pet }).then((data: Pet) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error('Unable to process request'));
        });
    });
}

export function remove(id: number): Promise<Pet> {
    return new Promise<Pet>((resolve, reject) => {
        prisma.pet.delete({ where: { id } }).then((data: Pet) => {
            resolve(data);
        }).catch((err) => {
            reject(new Error('Unable to process request'));
        });
    });
}