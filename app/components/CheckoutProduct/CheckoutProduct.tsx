"use client";

import { Product } from "@/app/types/entities";
import Image from "next/image";
import { useState, useContext } from "react";
import StarRating from "../StarRating/StartRating";
import Currency from "../Currency/Currency";
import HasPrime from "../HasPrime/HasPrime";


interface Props {
  productItem: Product;
}

const CheckoutProduct = ({ productItem }: Props) => {
  const [hasPrime] = useState(Math.random() < 0.5);

  return (
    <div className="grid grid-cols-5">
      <div className="relative h-[160px] w-[125px] ms-3">
        <Image
          src={productItem.image}
          alt=""
          loading="lazy"
          fill
          quality={100}
          className="object-contain"
        />
      </div>

      {/* middle col */}
      <div className="col-span-3 ms-6 mx-5">
        <p>{productItem.title}</p>
        <div>
          <StarRating />
        </div>
        <p className="text-xs my-2 line-clamp-3">{productItem.description}</p>
        <Currency price={productItem.price} />

        {hasPrime && <HasPrime />}
      </div>

      <div className="flex flex-col gap-2 my-auto justify-self-end">
        <button
          className="mt-auto button"
        >
          Add To Basket
        </button>
        <button
          className="mt-auto button"
        >
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
