import {
  Product as PrismaProduct,
  Category,
  ProductImage,
  Prisma,
} from "@prisma/client";

export interface ProductWithDetails extends Omit<PrismaProduct, "price"> {
  category: Category;
  images: ProductImage[];
  price: string | number | Prisma.Decimal;
}
