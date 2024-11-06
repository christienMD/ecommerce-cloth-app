"use client";

import dynamic from "next/dynamic";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import useCartStore from "@/app/store/useCartStore";

const CartIcon = () => {
  const totalProducts = useCartStore((state) => state.getTotalItems());

  return (
    <Link href="/checkout" className="link relative flex items-center">
      <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-dress_realm-yellow text-center rounded-full text-black font-bold">
        {totalProducts}
      </span>
      <ShoppingCart className="h-10" />
      <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
    </Link>
  );
};

const LoadingState = () => {
  return (
    <div className="link relative flex items-center gap-2">
      <div className="relative">
        <Skeleton className="h-8 w-8 rounded bg-gray-200" />
        <Skeleton className="absolute -top-1 right-0 h-4 w-4 rounded-full bg-gray-200" />
      </div>
      <Skeleton className="hidden md:inline h-5 w-14 bg-gray-200" />
    </div>
  );
};

export default dynamic(() => Promise.resolve(CartIcon), {
  ssr: false,
  loading: () => <LoadingState />,
});
