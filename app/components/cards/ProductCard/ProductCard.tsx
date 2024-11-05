"use client";

import Image from "next/image";
import { useState } from "react";
import HasPrime from "../../HasPrime/HasPrime";
import { Product } from "@/app/types/entities";
import StarRating from "../../StarRating/StartRating";
import Currency from "../../Currency/Currency";
import useCartStore from "@/app/store/useCartStore";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="border relative flex flex-col m-4 bg-white z-30 p-5">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image
        src={product.image}
        alt="product-image"
        height={100}
        width={100}
        className="object-contain"
      />

      <h4 className="mt-3 mb-0.5">{product.title}</h4>
      <StarRating />
      <p className="text-xs line-clamp-2 my-2">{product.description}</p>
      <div className="mb-5">
        <Currency price={product.price} />
      </div>
      {hasPrime && <HasPrime />}

      <button
        className="mt-auto button"
        onClick={() => addProductToCart(product)}
      >
        Add To Basket
      </button>
    </div>
  );
};

export default ProductCard;
