import { Category, PetStatus } from '@prisma/client';

import prisma from './../src/utils/client.prisma';
import logger from './../src/utils/logger';

async function main() {
    const category: Category = await prisma.category.upsert({
        where: {
            id: 1
        },
        update: {
            name: 'Seeded category'
        },
        create: {
            name: 'Seeded category'
        }
    });
    await prisma.pet.upsert({
        where: {
            id: 1
        },
        update: {
            name: 'Seeded pet',
            status: PetStatus.AVAILABLE,
            category_id: category.id
        },
        create: {
            name: 'Seeded pet',
            status: PetStatus.AVAILABLE,
            category_id: category.id
        }
    });
}

main()
    .catch((e) => {
        logger.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });