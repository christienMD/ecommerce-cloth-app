// app/components/sections/ProductFeed/ProductFeed.tsx
"use client";

import Image from "next/image";
import ProductCard from "../../cards/ProductCard/ProductCard";
import { ProductWithDetails } from "@/app/types/entities";
import useProducts from "@/hooks/useProducts";
import useSearch from "@/hooks/useSearch";
import ProductFeedSkeleton from "../../Skeletons/ProductFeedSkeleton/ProductFeedSkeleton";
import ProductFeedError from "../../ProductFeedError/ProductFeedError";
import Search from "../../Search/Search";
import Link from "next/link";

interface ProductFeedProps {
  searchParams?: {
    search?: string;
  };
}

const ProductFeed = ({ searchParams }: ProductFeedProps) => {
  const query = searchParams?.search || "";

  // Use search hook when there's a query, otherwise use regular products hook
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearch(query);

  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
    refetch,
  } = useProducts();

  // Determine which data and loading state to use
  const isLoading = query ? isSearchLoading : isProductsLoading;
  const error = query ? searchError : productsError;
  const displayProducts = query ? searchData?.products : products;

  if (isLoading) {
    return <ProductFeedSkeleton />;
  }

  if (error) {
    return <ProductFeedError error={error} reset={() => refetch()} />;
  }

  // Show message if no products found
  if (!displayProducts?.length) {
    return (
      <div className="text-center py-10">
        {query && (
          <div className="md:hidden px-4">
            <Search />
          </div>
        )}
        <h2 className="text-xl font-semibold px-4 mt-2">
          {query
            ? "No products found matching your search"
            : "No products available"}
        </h2>
        {query && (
          <p className="text-gray-500 mt-2">
            Try searching with different keywords
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 md:-mt-52 mx-auto">
        {/* Modified layout based on search state */}
        {query ? (
          // Simple grid layout for search results
          displayProducts.map((product: ProductWithDetails) => (
            <div className="mt-56" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          // Your original layout for regular product display
          <>
            <div className="md:hidden px-4 mb-8">
              <Search />
            </div>
            {/* First 5 products */}
            {displayProducts.slice(0, 5).map((product: ProductWithDetails) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Banner image */}
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

            {/* 6th product */}
            <div className="md:col-span-2">
              {displayProducts
                .slice(5, 6)
                .map((product: ProductWithDetails) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Remaining products */}
            {displayProducts.slice(6).map((product: ProductWithDetails) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </>
        )}
      </div>
      <div className="p-6 flex items-center justify-center md:justify-start">
        <Link
          href="/products"
          className="bg-dress_realm-yellow hover:opacity-75 text-amazon_blue font-medium w-80 py-3 px-8 rounded-md transition-colors disabled:opacity-50 disabled:cursor-text inline-flex items-center justify-center gap-2"
        >
          Show More Products
        </Link>
      </div>
    </div>
  );
};

export default ProductFeed;

// "use client";

// import Image from "next/image";
// import ProductCard from "../../cards/ProductCard/ProductCard";
// import { ProductWithDetails } from "@/app/types/entities";
// import useProducts from "@/hooks/useProducts";
// import ProductFeedSkeleton from "../../Skeletons/ProductFeedSkeleton/ProductFeedSkeleton";
// import ProductFeedError from "../../ProductFeedError/ProductFeedError";

// const ProductFeed = () => {
//  const { data: products, isLoading, error, refetch } = useProducts();

//  if (isLoading) {
//    return <ProductFeedSkeleton />;
//  }

//  if (error) {
//    return <ProductFeedError error={error} reset={() => refetch()} />;
//  }

//  if (!products) return null;
//   return (
//     <div className="grid grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 md:-mt-52 mx-auto">
//       {/* Render the first 5 products */}
//       {products?.slice(0, 5).map((product: ProductWithDetails) => (
//         <ProductCard key={product.id} product={product} />
//       ))}

//       {/* Render the Banner image */}
//       <div className="relative h-[300px] md:col-span-full mx-5">
//         <Image
//           className="w-full h-full object-cover"
//           src="https://links.papareact.com/dyz"
//           alt=""
//           fill
//           loading="lazy"
//           quality={100}
//           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
//         />
//       </div>

//       {/* Render the 6th product */}
//       <div className="md:col-span-2">
//         {products?.slice(5, 6).map((product: ProductWithDetails) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//       {/* Render the remaining products */}
//       {products
//         ?.slice(6, products.length)
//         .map((product: ProductWithDetails) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//     </div>
//   );
// };

// export default ProductFeed;
