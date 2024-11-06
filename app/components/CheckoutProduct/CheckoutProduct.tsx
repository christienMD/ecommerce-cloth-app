import React, { useState } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "../StarRating/StartRating";
import Currency from "../Currency/Currency";
import HasPrime from "../HasPrime/HasPrime";
import useCartStore from "@/app/store/useCartStore";
import { ProductWithDetails } from "@/app/types/entities";
import { Prisma } from "@prisma/client";
import CheckoutProductSkeleton from "../Skeletons/CheckoutProductSkeleton/CheckoutProductSkeleton";


interface Props {
  productItem: ProductWithDetails;
  isLoading?: boolean;
}

const CheckoutProduct = ({ productItem, isLoading = false }: Props) => {
  const [hasPrime] = useState(Math.random() < 0.5);
  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeProductFromCart = useCartStore(
    (state) => state.removeItemFromCart
  );

  const itemInCart = cartItems.find((item) => item.id === productItem.id);
  const quantity = itemInCart?.quantity || 0;

  // Get the first image or use a placeholder
  // Safely get the first image or use a placeholder
  const productImage =
    productItem.images && productItem.images.length > 0
      ? productItem.images[0].imageUrl
      : "/placeholder-product.jpg";

  // Convert Prisma Decimal to number for the Currency component
  const price =
    productItem.price instanceof Prisma.Decimal
      ? parseFloat(productItem.price.toString())
      : typeof productItem.price === "string"
      ? parseFloat(productItem.price)
      : productItem.price;

  if (isLoading) return <CheckoutProductSkeleton />

    return (
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 py-4">
        {/* Image Container */}
        <div className="relative h-[200px] md:h-[160px] w-full md:w-[150px] mx-auto md:ms-3">
          <Image
            src={productImage}
            alt=""
            loading="lazy"
            fill
            quality={100}
            className="object-contain"
          />
        </div>

        {/* Middle Section */}
        <div className="col-span-1 md:col-span-3 space-y-2 md:ms-6 md:mx-5">
          <p>{productItem.name}</p>
          <div>
            <StarRating />
          </div>
          <p className="text-xs my-2 line-clamp-3">{productItem.description}</p>
          <Currency price={price} />
          {hasPrime && <HasPrime />}
        </div>

        {/* Right Section */}
        <div className="flex flex-col space-y-2 items-center md:items-end">
          {/* Quantity Adjuster */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => decreaseQuantity(productItem.id)}
              disabled={quantity === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-8 text-center font-medium">{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => increaseQuantity(productItem.id)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeProductFromCart(productItem.id)}
            className="button w-full md:w-auto"
          >
            Remove From Basket
          </button>
        </div>
      </div>
    );
};

export default CheckoutProduct;
