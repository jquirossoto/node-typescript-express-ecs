/**
 * @file Pet model.
 * @author jquirossoto
 */
import { Pet as PrismaPet, Prisma } from '@prisma/client';

export default class Pet {

    id: number | null;
    name: string;
    status: 'AVAILABLE' | 'PENDING' | 'SOLD';
    category_id: number;
    owner_id: number | null;

    constructor(id: number | null, name: string, status: 'AVAILABLE' | 'PENDING' | 'SOLD', category_id: number, owner_id: number | null) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.category_id = category_id;
        this.owner_id = owner_id;
    }

    static toCreateInput = (pet: Pet): Prisma.PetCreateInput => {
        return {
            name: pet.name,
            status: pet.status,
            category: {
                connect: {
                    id: pet.category_id
                }
            }
        };
    };

    static toUpdateInput = (pet: Pet): Prisma.PetUncheckedUpdateInput => {
        return {
            name: pet.name,
            status: pet.status,
            category_id: pet.category_id,
            owner_id: pet.owner_id
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
                result.push(new Pet(pet[i].id, pet[i].name, pet[i].status, pet[i].category_id, pet[i].owner_id));
            }
        } else {
            if (pet) {
                result = new Pet(pet.id, pet.name, pet.status, pet.category_id, pet.owner_id);
            } else {
                result = null;
            }
        }
        return result;
    }

}