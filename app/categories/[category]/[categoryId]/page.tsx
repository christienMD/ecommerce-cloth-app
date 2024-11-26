// app/categories/[category]/[categoryId]/page.tsx
import React from "react";
import prisma from "@/prisma/client";
import ProductCategory from "./ProductCategory/ProductCategory";
import { Prisma } from "@prisma/client";

interface Props {
  params: {
    category: string;
    categoryId: string;
  };
  searchParams: {
    page: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

export const maxDuration = 60;

async function ProductCategoryPage({ params, searchParams }: Props) {
  const currentPage = parseInt(searchParams.page) || 1;
  const pageSize = 9;

  // Build price filter conditions
  const priceFilter: Prisma.ProductWhereInput = {
    categoryId: parseInt(params.categoryId),
    ...(searchParams.minPrice || searchParams.maxPrice
      ? {
          price: {
            gte: searchParams.minPrice
              ? new Prisma.Decimal(searchParams.minPrice)
              : undefined,
            lte: searchParams.maxPrice
              ? new Prisma.Decimal(searchParams.maxPrice)
              : undefined,
          },
        }
      : {}),
  };

  // Get total count with filters
  const totalProducts = await prisma.product.count({
    where: priceFilter,
  });

  // Fetch filtered and paginated products
  const products = await prisma.product.findMany({
    where: priceFilter,
    include: {
      category: true,
      images: true,
    },
    take: pageSize,
    skip: (currentPage - 1) * pageSize,
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <ProductCategory
      products={products}
      categories={categories}
      currentCategoryId={params.categoryId}
      currentCategoryName={params.category}
      page={currentPage}
      pageSize={pageSize}
      totalProducts={totalProducts}
    />
  );
}

export default ProductCategoryPage;
