/**
 * @file Pet model.
 * @author jquirossoto
 */
import { Pet as PrismaPet, Prisma } from '@prisma/client';

export default class Pet {

    id: number | null;
    name: string;
    status: 'AVAILABLE' | 'PENDING' | 'SOLD';
    categoryId: number;
    ownerId: number | null;

    constructor (id: number | null, name: string, status: 'AVAILABLE' | 'PENDING' | 'SOLD', categoryId: number, ownerId: number | null) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.categoryId = categoryId;
        this.ownerId = ownerId;
    }

    static toCreateInput = (pet: Pet): Prisma.PetCreateInput => {
        const createInput: Prisma.PetCreateInput = {
            name: pet.name,
            status: pet.status,
            category: {
                connect: {
                    id: pet.categoryId
                }
            }
        };
        if (pet.ownerId) {
            createInput.owner = {
                connect: {
                    id: pet.ownerId
                }
            };
        }
        return createInput;
    };

    static toUpdateInput = (pet: Pet): Prisma.PetUncheckedUpdateInput => {
        return {
            name: pet.name,
            status: pet.status,
            categoryId: pet.categoryId,
            ownerId: pet.ownerId
        };
    };

    static toModel (pet: null): null;
    static toModel (pet: PrismaPet | null): Pet;
    static toModel (pets: PrismaPet[]): Pet[];
    
    static toModel (pet: PrismaPet | PrismaPet[] | null): Pet | Pet[] | null {
        let result: Pet | Pet[] | null;
        if (Array.isArray(pet)) {
            result = [];
            for (let i = 0; i < pet.length; i++) {
                result.push(new Pet(pet[i].id, pet[i].name, pet[i].status, pet[i].categoryId, pet[i].ownerId));
            }
        } else {
            if (pet) {
                result = new Pet(pet.id, pet.name, pet.status, pet.categoryId, pet.ownerId);
            } else {
                result = null;
            }
        }
        return result;
    }

}