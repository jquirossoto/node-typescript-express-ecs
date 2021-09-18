import { PetStatus } from '.prisma/client';

export interface Pet {
    id?: number;
    name: string;
    status: PetStatus;
    category_id: number;
}
