// components/AllProducts/AllProducts.tsx
"use client";

import ProductCard from "@/app/components/cards/ProductCard/ProductCard";
import ProductFeedError from "@/app/components/ProductFeedError/ProductFeedError";
import ProductCardSkeleton from "@/app/components/Skeletons/ProductCardSkeleton/ProductCardSkeleton";
import useInfiniteProducts from "@/hooks/useInfiniteProducts";
import { Loader2 } from "lucide-react";

const pageSize = 12;

const AllProducts = () => {
  const {
    data: products,
    isLoading,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteProducts(pageSize);

  // Initial loading state - Show skeletons
  if (isLoading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Skeleton */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/6" />
          </div>

          {/* Grid of Skeletons */}
          <div className="grid grid-cols-1 md:grid-cols-3 xxl:grid-cols-4 gap-6">
            {[...Array(pageSize)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <ProductFeedError error={error} reset={() => refetch()} />;
  }

  if (!products?.pages[0]?.products.length) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <p className="text-gray-500 text-lg">No products available</p>
        </div>
      </div>
    );
  }

  const allProducts = products.pages.flatMap((page) => page.products);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-amazon_blue">All Products</h1>
          {/* <p className="text-gray-600 mt-1">
            {allProducts.length} products loaded
          </p> */}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 xxl:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Show More Button */}
        {hasNextPage && (
          <div className="mt-8 text-center">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-dress_realm-yellow hover:opacity-75 text-amazon_blue font-medium py-3 px-8 rounded-md transition-colors disabled:opacity-50 disabled:cursor-text inline-flex items-center gap-2"
            >
              {isFetchingNextPage ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading more products...
                </>
              ) : (
                "Show More Products"
              )}
            </button>
          </div>
        )}

        {/* End Message */}
        {!hasNextPage && allProducts.length > 0 && (
          <div className="mt-8 text-center text-gray-500">
            You&apos;ve reached the end of the list
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
