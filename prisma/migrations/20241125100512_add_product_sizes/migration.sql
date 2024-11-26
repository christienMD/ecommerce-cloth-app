/*
  Warnings:

  - Changed the type of `size` on the `product_sizes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Size" AS ENUM ('LG', 'XL', 'XXL');

-- DropForeignKey
ALTER TABLE "product_sizes" DROP CONSTRAINT "product_sizes_productId_fkey";

-- DropIndex
DROP INDEX "product_sizes_size_key";

-- AlterTable
ALTER TABLE "product_sizes" DROP COLUMN "size",
ADD COLUMN     "size" "Size" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "product_sizes_productId_size_key" ON "product_sizes"("productId", "size");

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
