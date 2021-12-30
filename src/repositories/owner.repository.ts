import { Owner as PrismaOwner } from '@prisma/client';

import prisma from './../utils/client.prisma';
import Owner from './../models/owner.model';

export const create = (owner: Owner): Promise<Owner> => {
    return new Promise<Owner> ((resolve, reject) => {
        prisma.owner.create({ data: Owner.toCreateInput(owner), include: { address: true } }).then((data: PrismaOwner) => {
            resolve(Owner.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export const findUnique = (id: number): Promise<Owner> => {
    return new Promise<Owner>((resolve, reject) => {
        prisma.owner.findUnique({ where: { id }, include: { address: true } }).then((data: PrismaOwner | null) => {
            resolve(Owner.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export const findMany = (): Promise<Owner[]> => {
    return new Promise<Owner[]>((resolve, reject) => {
        prisma.owner.findMany({ include: { address: true } }).then((data: PrismaOwner[]) => {
            resolve(Owner.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export const update = (id: number, owner: Owner): Promise<Owner> => {
    return new Promise<Owner>((resolve, reject) => {
        prisma.owner.update({ where: { id }, data: Owner.toUpdateInput(owner), include: { address: true } }).then((data: PrismaOwner) => {
            resolve(Owner.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
}

export const remove = (id: number): Promise<Owner> => {
    return new Promise<Owner>((resolve, reject) => {
        prisma.owner.delete({ where: { id }, include: { address: true } }).then((data: PrismaOwner) => {
            resolve(Owner.toModel(data));
        }).catch((err: Error) => {
            reject(err);
        });
    });
}