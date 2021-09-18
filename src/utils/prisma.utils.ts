import { Prisma } from '@prisma/client';

export function errorHandler (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {

    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {

    } else if (error instanceof Prisma.PrismaClientRustPanicError) {

    } else if (error instanceof Prisma.PrismaClientInitializationError) {

    } else if (error instanceof Prisma.PrismaClientValidationError) {

    } else {

    }
}