"use client";

import Skeleton from "react-loading-skeleton";
import ProductCardSkeleton from "../ProductCardSkeleton/ProductCardSkeleton";


const ProductFeedSkeleton = () => {
  // Generate an array of skeleton cards
  const skeletonCards = Array(19)
    .fill(0)
    .map((_, i) => <ProductCardSkeleton key={`skeleton-${i}`} />);

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 md:-mt-52 mx-auto">
      {/* First 5 skeleton cards */}
      {skeletonCards.slice(0, 5)}

      {/* Banner Image placeholder */}
      <div className="relative h-[300px] md:col-span-full mx-5">
        <Skeleton height={300} />
      </div>

      {/* 6th skeleton card with span-2 */}
      <div className="md:col-span-2">{skeletonCards.slice(5, 6)}</div>

      {/* Remaining skeleton cards */}
      {skeletonCards.slice(6)}
    </div>
  );
};

export default ProductFeedSkeleton;
