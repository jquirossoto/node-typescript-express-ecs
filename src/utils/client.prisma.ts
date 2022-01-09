/**
 * @file Prisma client singleton
 * @author jquirossoto
 */

import Prisma from "@prisma/client";

const PrismaClient = Prisma.PrismaClient;

const prisma = new PrismaClient();
export default prisma;