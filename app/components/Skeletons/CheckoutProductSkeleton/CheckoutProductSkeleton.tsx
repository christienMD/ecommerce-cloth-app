"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckoutProductSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
      <div className="relative h-[200px] md:h-[160px] w-full md:w-[125px] mx-auto md:ms-3">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="col-span-1 md:col-span-3 space-y-2 md:ms-6 md:mx-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-6 w-20" />
      </div>

      <div className="flex flex-col space-y-2 items-center md:items-end">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
        <Skeleton className="h-10 w-full md:w-32" />
      </div>
    </div>
  );
};

export default CheckoutProductSkeleton;
