/**
 * @file Prisma client singleton
 * @author jquirossoto
 */

import Prisma from "@prisma/client";

let prisma;

if (Prisma === undefined) {
	import("@prisma/client").then(({ PrismaClient }) => {
		prisma = new PrismaClient();
	});
} else {
	prisma = new Prisma.PrismaClient();
}
export default prisma;