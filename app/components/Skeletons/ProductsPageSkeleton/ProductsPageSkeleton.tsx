// app/all-products/loading.tsx
"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductsPageSkeleton() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Skeleton */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="mb-2">
            <Skeleton height={32} width={200} />
          </div>
          {/* <Skeleton height={20} width={120} /> */}
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 xxl:grid-cols-4 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4">
              {/* Image skeleton */}
              <Skeleton height={200} className="mb-4" />

              {/* Title skeleton */}
              <div className="mb-3">
                <Skeleton height={24} width="80%" />
              </div>

              {/* Description skeleton */}
              <div className="mb-4">
                <Skeleton count={2} />
                <Skeleton width="60%" />
              </div>

              {/* Price and prime delivery skeleton */}
              <div className="flex justify-between items-center mb-4">
                <Skeleton width={80} height={28} />
                <Skeleton width={40} height={20} />
              </div>

              {/* Button skeleton */}
              <Skeleton height={40} className="w-full" />
            </div>
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="mt-8 text-center">
          <Skeleton height={48} width={200} className="mx-auto" />
        </div>
      </div>
    </div>
  );
}
