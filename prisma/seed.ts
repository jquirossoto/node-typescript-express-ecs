import { Category, Owner } from '@prisma/client';

import prisma from './../src/utils/prisma.js';
import logger from './../src/utils/logger.js';

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
    const owner: Owner = await prisma.owner.upsert({
        where: {
            id: 1
        },
        update: {
            firstName: 'Jane',
            middleInitial: 'M',
            lastName: 'Doe',
            identificationNumber: '109876543',
            address: {
                update: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            }
        },
        create: {
            firstName: 'Jane',
            middleInitial: 'M',
            lastName: 'Doe',
            identificationNumber: '109876543',
            address: {
                create: {
                    street: '995 Huel Curve',
                    buildingNumber: 'Suite 204',
                    city: 'Grimesview',
                    state: 'Bilzen',
                    countryCode: 'US',
                    postalCode: '65888-1483'
                }
            }
        }
    });
    await prisma.pet.upsert({
        where: {
            id: 1
        },
        update: {
            name: 'Seeded pet',
            status: 'AVAILABLE',
            categoryId: category.id,
            ownerId: owner.id
        },
        create: {
            name: 'Seeded pet',
            status: 'AVAILABLE',
            categoryId: category.id,
            ownerId: owner.id
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