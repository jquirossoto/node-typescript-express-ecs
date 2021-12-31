-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "owner_id" INTEGER;

-- CreateTable
CREATE TABLE "owners" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "middleInitial" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "identification_number" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "buildingNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "owners_address_id_key" ON "owners"("address_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
