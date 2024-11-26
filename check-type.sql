-- Alter the size column to text while preserving the data
ALTER TABLE "product_sizes" 
ALTER COLUMN "size" TYPE text 
USING size::text;