/**
 * @file Prisma client singleton
 * @author jquirossoto
 */

import Prisma from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prisma: any;

if (Prisma === undefined) {
  import('@prisma/client').then(({ PrismaClient }) => {
    prisma = new PrismaClient();
  });
} else {
  prisma = new Prisma.PrismaClient();
}
export default prisma;
