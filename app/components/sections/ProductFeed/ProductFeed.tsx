"use client";

import Image from "next/image";
import ProductCard from "../../cards/ProductCard/ProductCard";
import { ProductWithDetails } from "@/app/types/entities";
import useProducts from "@/hooks/useProducts";
import ProductFeedSkeleton from "../../Skeletons/ProductFeedSkeleton/ProductFeedSkeleton";
import ProductFeedError from "../../ProductFeedError/ProductFeedError";

const ProductFeed = () => {
 const { data: products, isLoading, error, refetch } = useProducts();

 if (isLoading) {
   return <ProductFeedSkeleton />;
 }

 if (error) {
   return <ProductFeedError error={error} reset={() => refetch()} />;
 }

 if (!products) return null;
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 md:-mt-52 mx-auto">
      {/* Render the first 5 products */}
      {products?.slice(0, 5).map((product: ProductWithDetails) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {/* Render the Banner image */}
      <div className="relative h-[300px] md:col-span-full mx-5">
        <Image
          className="w-full h-full object-cover"
          src="https://links.papareact.com/dyz"
          alt=""
          fill
          loading="lazy"
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>

      {/* Render the 6th product */}
      <div className="md:col-span-2">
        {products?.slice(5, 6).map((product: ProductWithDetails) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Render the remaining products */}
      {products
        ?.slice(6, products.length)
        .map((product: ProductWithDetails) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </div>
  );
};

export default ProductFeed;
