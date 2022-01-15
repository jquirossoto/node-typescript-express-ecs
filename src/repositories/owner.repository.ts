import prisma from '../utils/prisma.js';
import Owner, { GeneratedOwner } from './../models/owner.model.js';

export const create = (owner: Owner): Promise<Owner> => {
  return new Promise<Owner>((resolve, reject) => {
    prisma.owner
      .create({ data: Owner.toCreateInput(owner), include: { address: true } })
      .then((data: GeneratedOwner) => {
        resolve(Owner.toModel(data));
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

export const findUnique = (id: number): Promise<Owner> => {
  return new Promise<Owner>((resolve, reject) => {
    prisma.owner
      .findUnique({ where: { id }, include: { address: true } })
      .then((data: GeneratedOwner | null) => {
        resolve(Owner.toModel(data));
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

export const findMany = (): Promise<Owner[]> => {
  return new Promise<Owner[]>((resolve, reject) => {
    prisma.owner
      .findMany({ include: { address: true } })
      .then((data: GeneratedOwner[]) => {
        resolve(Owner.toModel(data));
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

export const update = (id: number, owner: Owner): Promise<Owner> => {
  return new Promise<Owner>((resolve, reject) => {
    prisma.owner
      .update({
        where: { id },
        data: Owner.toUpdateInput(owner),
        include: { address: true }
      })
      .then((data: GeneratedOwner) => {
        resolve(Owner.toModel(data));
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};

export const remove = (id: number): Promise<Owner> => {
  return new Promise<Owner>((resolve, reject) => {
    prisma.owner
      .delete({ where: { id }, include: { address: true } })
      .then((data: GeneratedOwner) => {
        prisma.address
          .delete({ where: { id: data.addressId } })
          .then(() => {
            resolve(Owner.toModel(data));
          })
          .catch(() => {
            resolve(Owner.toModel(data));
          });
      })
      .catch((err: Error) => {
        reject(err);
      });
  });
};
