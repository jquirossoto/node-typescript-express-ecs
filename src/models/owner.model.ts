import { Owner as PrismaOwner, Prisma } from '@prisma/client';

import Address from './address.model.js';

export default class Owner {
  id: number | null;
  firstName: string;
  middleInitial: string | null;
  lastName: string;
  identificationNumber: string;
  address: Address;

  constructor(
    id: number | null,
    firstName: string,
    middleInitial: string | null,
    lastName: string,
    identificationNumber: string,
    address: Address
  ) {
    this.id = id;
    this.firstName = firstName;
    this.middleInitial = middleInitial;
    this.lastName = lastName;
    this.identificationNumber = identificationNumber;
    this.address = address;
  }

  static toCreateInput(owner: Owner): Prisma.OwnerCreateInput {
    return {
      firstName: owner.firstName,
      middleInitial: owner.middleInitial,
      lastName: owner.lastName,
      identificationNumber: owner.identificationNumber,
      address: {
        create: {
          ...owner.address
        }
      }
    };
  }

  static toUpdateInput(owner: Owner): Prisma.OwnerUpdateInput {
    return {
      firstName: owner.firstName,
      middleInitial: owner.middleInitial,
      lastName: owner.lastName,
      identificationNumber: owner.identificationNumber,
      address: {
        update: {
          ...owner.address
        }
      }
    };
  }

  static toModel(owner: null): null;
  static toModel(owner: GeneratedOwner | null): Owner;
  static toModel(owners: GeneratedOwner[]): Owner[];

  static toModel(
    owner: GeneratedOwner | GeneratedOwner[] | null
  ): Owner | Owner[] | null {
    let result: Owner | Owner[] | null;
    if (Array.isArray(owner)) {
      result = [];
      for (let i = 0; i < owner.length; i++) {
        delete owner[i].address.id;
        result.push(
          new Owner(
            owner[i].id,
            owner[i].firstName,
            owner[i].middleInitial,
            owner[i].lastName,
            owner[i].identificationNumber,
            owner[i].address
          )
        );
      }
    } else {
      if (owner) {
        delete owner.address.id;
        result = new Owner(
          owner.id,
          owner.firstName,
          owner.middleInitial,
          owner.lastName,
          owner.identificationNumber,
          owner.address
        );
      } else {
        result = null;
      }
    }
    return result;
  }
}

// For more info refer to: https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety
export type GeneratedOwner = PrismaOwner & {
  address: Address & {
    id?: number;
  };
};
