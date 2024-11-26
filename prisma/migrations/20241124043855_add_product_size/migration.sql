-- CreateTable
CREATE TABLE "product_sizes" (
    "id" SERIAL NOT NULL,
    "size" VARCHAR(50) NOT NULL DEFAULT 'LG',
    "stockLevel" INTEGER NOT NULL DEFAULT 10,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_sizes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "product_sizes_size_key" ON "product_sizes"("size");

-- CreateIndex
CREATE UNIQUE INDEX "product_sizes_productId_size_key" ON "product_sizes"("productId", "size");

-- AddForeignKey
ALTER TABLE "product_sizes" ADD CONSTRAINT "product_sizes_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
