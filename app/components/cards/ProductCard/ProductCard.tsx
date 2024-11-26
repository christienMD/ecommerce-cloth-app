"use client";

import Image from "next/image";
import { useState } from "react";
import HasPrime from "../../HasPrime/HasPrime";
// import StarRating from "../../StarRating/StartRating";
import Currency from "../../Currency/Currency";
import useCartStore from "@/app/stores/useCartStore";
import { Prisma } from "@prisma/client";
import { ProductWithDetails } from "@/app/types/entities";

interface Props {
  product: ProductWithDetails;
}

const ProductCard = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [hasPrime] = useState(Math.random() < 0.5);

  // Get the first image or use a placeholder
  const productImage =
    product.images[0]?.imageUrl || "/placeholder-product.jpg";

  // Convert Prisma Decimal to number for the Currency component
  const price =
    product.price instanceof Prisma.Decimal
      ? parseFloat(product.price.toString())
      : typeof product.price === "string"
      ? parseFloat(product.price)
      : product.price;

  return (
    <div className="relative flex flex-col m-4 z-30 p-5 border rounded-lg shadow-sm bg-gray-50">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category.name}
      </p>

      <div className="relative h-[200px] w-full mb-4">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <h4 className="mt-1.5 mb-0.5 font-semibold text-lg">{product.name}</h4>
      {/* <StarRating /> */}
      <p className="text-xs line-clamp-2 my-2 text-gray-600">
        {product.description}
      </p>

      <div className="mb-3">
        <Currency price={price} />
      </div>

      {hasPrime && <HasPrime />}

      <button
        className="mt-auto button bg-yellow-400 hover:bg-yellow-500 py-2 px-4 rounded-md transition-colors"
        onClick={() => addProductToCart(product)}
      >
        Add To Basket
      </button>
    </div>
  );
};

export default ProductCard;
