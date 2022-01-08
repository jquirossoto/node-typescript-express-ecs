-- DropForeignKey
ALTER TABLE "owners" DROP CONSTRAINT "owners_address_id_fkey";

-- AddForeignKey
ALTER TABLE "owners" ADD CONSTRAINT "owners_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
