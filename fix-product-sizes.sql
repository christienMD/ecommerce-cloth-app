-- Backup the product_sizes table
CREATE TABLE "product_sizes_backup" AS SELECT * FROM "product_sizes";

-- Drop the original table
DROP TABLE "product_sizes";

-- Recreate the table with the correct schema
CREATE TABLE "product_sizes" (
    "id" SERIAL PRIMARY KEY,
    "size" text NOT NULL,
    "productId" INTEGER NOT NULL,
    "stockLevel" INTEGER NOT NULL DEFAULT 10,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("productId") REFERENCES "Product"(id) ON DELETE CASCADE,
    UNIQUE("productId", "size")
);

-- Copy data back
INSERT INTO "product_sizes" ("id", "size", "productId", "stockLevel", "createdAt", "updatedAt")
SELECT "id", "size"::text, "productId", "stockLevel", "createdAt", "updatedAt"
FROM "product_sizes_backup";