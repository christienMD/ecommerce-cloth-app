// components/ProductCategory/ProductCategory.tsx
"use client";

import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "@/app/components/cards/ProductCard/ProductCard";
import Link from "next/link";
import { Category } from "@prisma/client";
import { ProductWithDetails } from "@/app/types/entities";
import Pagination from "@/app/components/Pagination/Pagination";
import PriceRangeFilter from "../PriceRangeFilter/PriceRangeFilter";

interface ProductCategoryProps {
  products: ProductWithDetails[];
  categories: Category[];
  currentCategoryId: string;
  currentCategoryName: string;
  page: number;
  pageSize: number;
  totalProducts: number;
}

const formatForUrl = (str: string) => {
  return encodeURIComponent(
    str
      .toLowerCase()
      .replace(/[/\\]/g, "-")
      .replace(/\s+/g, "-")
      .replace(/[&]/g, "and")
      .replace(/[^a-z0-9-]/g, "")
      .replace(/-+/g, "-")
      .trim()
  );
};

const ProductCategory = ({
  products,
  categories,
  currentCategoryId,
  currentCategoryName,
  page,
  pageSize,
  totalProducts,
}: ProductCategoryProps) => {
  const CategorySidebar = ({ className }: { className?: string }) => (
    <div className={cn("space-y-6", className)}>
      <div>
        <h3 className="text-lg font-semibold text-amazon_blue mb-4">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${formatForUrl(cat.name)}/${cat.id}`}
              className={cn(
                "block px-3 py-2 rounded-md text-sm transition-colors",
                parseInt(currentCategoryId) === cat.id
                  ? "bg-dress_realm-yellow text-amazon_blue font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories on Mobile */}
        <div className="lg:hidden mb-4">
          <Sheet>
            <SheetTrigger asChild>
              <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-white shadow-sm text-amazon_blue hover:bg-gray-50">
                <FilterIcon size={20} />
                Categories
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <CategorySidebar className="mt-6" />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Categories Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-28">
              <CategorySidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header and Price Filter Section */}
            <div className="space-y-4">
              {/* Header */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div>
                  <h1 className="text-2xl font-bold text-amazon_blue">
                    {decodeURIComponent(currentCategoryName)}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {totalProducts} products available
                  </p>
                </div>
              </div>

              {/* Price Filter - Now positioned below header */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <PriceRangeFilter />
              </div>
            </div>

            {/* Products Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 xxl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500 text-lg">
                  No products found in this category
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalProducts > pageSize && (
              <div className="mt-8">
                <Pagination
                  itemCount={totalProducts}
                  pageSize={pageSize}
                  currentPage={page}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
