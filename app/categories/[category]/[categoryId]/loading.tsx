// app/categories/[category]/[categoryId]/loading.tsx
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FilterIcon } from "lucide-react";

const ProductCategoryLoading = () => {
  // Helper function to render multiple skeletons
  const renderCategorySkeletons = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="px-3 py-2">
          <Skeleton height={20} />
        </div>
      ));
  };

  // Helper function to render product card skeletons
  const renderProductSkeletons = (count: number) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className="relative flex flex-col m-4 z-30 p-5 border rounded-lg shadow-sm bg-gray-50"
        >
          <div className="absolute top-2 right-2 w-20">
            <Skeleton height={12} />
          </div>

          {/* Product Image */}
          <div className="relative h-[200px] w-full mb-4">
            <Skeleton height="100%" />
          </div>

          {/* Product Title */}
          <div className="mb-2">
            <Skeleton height={24} />
          </div>

          {/* Rating */}
          <div className="mb-2">
            <Skeleton height={16} width={100} />
          </div>

          {/* Description */}
          <div className="mb-2">
            <Skeleton count={2} height={16} />
          </div>

          {/* Price */}
          <div className="mb-3">
            <Skeleton height={20} width={80} />
          </div>

          {/* Button */}
          <Skeleton height={36} />
        </div>
      ));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Categories Button */}
        <div className="lg:hidden mb-4">
          <button className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md bg-white shadow-sm text-amazon_blue hover:bg-gray-50">
            <FilterIcon size={20} />
            Categories
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Categories Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-28">
              <div className="space-y-6">
                {/* Category Title */}
                <div className="mb-4">
                  <Skeleton height={24} width={100} />
                </div>

                {/* Category Links */}
                <div className="space-y-2">{renderCategorySkeletons(8)}</div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div>
                <Skeleton height={32} width={200} className="mb-2" />
                <Skeleton height={20} width={150} />
              </div>
            </div>

            {/* Price Filter */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-4">
              <div className="mb-4">
                <Skeleton height={24} width={100} />
              </div>
              <div className="space-y-4">
                <Skeleton height={16} />
                <div className="flex justify-between">
                  <Skeleton height={20} width={100} />
                  <Skeleton height={20} width={100} />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 xxl:grid-cols-4 gap-6">
              {renderProductSkeletons(9)}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <Skeleton circle width={40} height={40} />
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Skeleton key={i} width={32} height={32} />
                  ))}
                <Skeleton circle width={40} height={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryLoading;
