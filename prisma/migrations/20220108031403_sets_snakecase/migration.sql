/*
  Warnings:

  - You are about to drop the column `buildingNumber` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `countryCode` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `owners` table. All the data in the column will be lost.
  - You are about to drop the column `middleInitial` on the `owners` table. All the data in the column will be lost.
  - Added the required column `building_number` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_code` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `addresses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `owners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `owners` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middle_initial` to the `owners` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "owners" DROP CONSTRAINT "owners_address_id_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "buildingNumber",
DROP COLUMN "countryCode",
DROP COLUMN "postalCode",
ADD COLUMN     "building_number" TEXT NOT NULL,
ADD COLUMN     "country_code" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "owners" DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "middleInitial",
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "middle_initial" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
