import Address  from './address.model';
import { Owner as PrismaOwner, Prisma } from '@prisma/client';

export default class Owner {

    id: number | null;
    firstName: string;
    middleInitial: string;
    lastName: string;
    identification_number: string;
    address: Address;

    constructor(id: number | null, firstName: string, middleInitial: string, lastName: string, identification_number: string, address: Address) {
        this.id = id;
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.identification_number = identification_number;
        this.address = address;
    }

    static toCreateInput(owner: Owner): Prisma.OwnerCreateInput {
        return {
            firstName: owner.firstName,
            middleInitial: owner.middleInitial,
            lastName: owner.lastName,
            identification_number: owner.identification_number,
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
            identification_number: owner.identification_number,
            address: {
                update: {
                    ...owner.address
                }
            }
        };
    }

    static toModel (owner: null): null;
    static toModel (owner: PrismaOwner | null): Owner;
    static toModel (owners: PrismaOwner[]): Owner[];
    
    static toModel (owner: PrismaOwner | PrismaOwner[] | null): Owner | Owner[] | null {
        let result: Owner | Owner[] | null;
        if (Array.isArray(owner)) {
            result = [];
            for (let i = 0; i < owner.length; i++) {
                // @ts-ignore
                delete owner[i].address.id;
                // @ts-ignore
                result.push(new Owner(owner[i].id, owner[i].firstName, owner[i].middleInitial, owner[i].lastName, owner[i].identification_number, owner[i].address));
            }
        } else {
            if (owner) {
                // @ts-ignore
                delete owner.address.id;
                // @ts-ignore
                result = new Owner(owner.id, owner.firstName, owner.middleInitial, owner.lastName, owner.identification_number, owner.address);
            } else {
                result = null;
            }
        }
        return result;
    }
    
}