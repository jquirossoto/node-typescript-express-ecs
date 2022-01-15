-- CreateEnum
CREATE TYPE "pet_status_enum" AS ENUM ('AVAILABLE', 'PENDING', 'SOLD');

-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "pet_status_enum" NOT NULL,
    "category_id" INTEGER NOT NULL,
    "owner_id" INTEGER,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "owners" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_initial" TEXT,
    "last_name" TEXT NOT NULL,
    "identification_number" TEXT NOT NULL,
    "address_id" INTEGER NOT NULL,

    CONSTRAINT "owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "building_number" TEXT,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country_code" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "owners_address_id_key" ON "owners"("address_id");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owners"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
