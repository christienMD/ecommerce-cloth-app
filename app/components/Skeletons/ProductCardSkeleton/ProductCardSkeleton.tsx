"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCardSkeleton = () => {
  return (
    <div className="relative flex flex-col m-4 bg-white z-30 p-5 border rounded-lg shadow-sm">
      {/* Category */}
      <div className="absolute top-0 right-2 mb-3">
        <Skeleton width={60} height={10} />
      </div>

      {/* Product Image */}
      <div className="relative h-[200px] w-full mb-4">
        <Skeleton height={200} />
      </div>

      {/* Product Name */}
      <div className="mt-3 mb-0.5">
        <Skeleton height={24} width="70%" />
      </div>

      {/* Star Rating */}
      <div className="my-2">
        <Skeleton width={100} height={20} />
      </div>

      {/* Description */}
      <div className="my-2">
        <Skeleton count={2} height={16} />
      </div>

      {/* Price */}
      <div className="mb-5">
        <Skeleton width={80} height={24} />
      </div>

      {/* Prime badge */}
      <div className="mb-4">
        <Skeleton width={120} height={24} />
      </div>

      {/* Add to basket button */}
      <Skeleton height={40} className="mt-auto" />
    </div>
  );
};

export default ProductCardSkeleton;
