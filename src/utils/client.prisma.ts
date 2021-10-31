/**
 * @file Prisma client singleton
 * @author jquirossoto
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export default prisma;