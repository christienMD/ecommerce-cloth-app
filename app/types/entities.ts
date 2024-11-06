import {
  Product as PrismaProduct,
  Category,
  ProductImage,
} from "@prisma/client";

export interface ProductWithDetails extends PrismaProduct {
  category: Category;
  images: ProductImage[];
}
