import React from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import StarRating from "../StarRating/StartRating";
import Currency from "../Currency/Currency";
import HasPrime from "../HasPrime/HasPrime";
import useCartStore from "@/app/stores/useCartStore";
import { ProductWithDetails } from "@/app/types/entities";
import { Prisma, ProductSize } from "@prisma/client";
import CheckoutProductSkeleton from "../Skeletons/CheckoutProductSkeleton/CheckoutProductSkeleton";

type ProductSizeType = "LG" | "XL" | "XXL";

interface Props {
  productItem: ProductWithDetails;
  isLoading?: boolean;
}

const fetchProductSizes = async (productId: number): Promise<ProductSize[]> => {
  if (!productId) {
    return [
      {
        id: 1,
        size: "LG",
        stockLevel: 10,
        productId: productId,
      } as ProductSize,
      {
        id: 2,
        size: "XL",
        stockLevel: 10,
        productId: productId,
      } as ProductSize,
      {
        id: 3,
        size: "XXL",
        stockLevel: 10,
        productId: productId,
      } as ProductSize,
    ];
  }

  try {
    const response = await fetch(`/api/products/${productId}/sizes`);
    if (!response.ok) {
      throw new Error("Failed to fetch sizes");
    }
    const data = await response.json();

    // Return default sizes if none found
    if (!data || data.length === 0) {
      return [
        {
          id: 1,
          size: "LG",
          stockLevel: 10,
          productId: productId,
        } as ProductSize,
        {
          id: 2,
          size: "XL",
          stockLevel: 10,
          productId: productId,
        } as ProductSize,
        {
          id: 3,
          size: "XXL",
          stockLevel: 10,
          productId: productId,
        } as ProductSize,
      ];
    }

    return data;
  } catch (error) {
    console.error("Error fetching sizes:", error);
    // Return default sizes on error
    return [
      {
        id: 1,
        size: "LG",
        stockLevel: 10,
        productId: productId,
      } as ProductSize,
      {
        id: 2,
        size: "XL",
        stockLevel: 10,
        productId: productId,
      } as ProductSize,
      {
        id: 3,
        size: "XXL",
        stockLevel: 10,
        productId: productId,
      } as ProductSize,
    ];
  }
};

const CheckoutProduct = ({ productItem, isLoading = false }: Props) => {
  const [hasPrime] = React.useState(Math.random() < 0.5);

  const { data: sizes = [], isLoading: loadingSizes } = useQuery({
    queryKey: ["productSizes", productItem.id],
    queryFn: () => fetchProductSizes(productItem.id),
    staleTime: 5 * 60 * 1000,
    enabled: !!productItem.id,
    retry: 1,
  });

  const cartItems = useCartStore((state) => state.cartItems);
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeProductFromCart = useCartStore(
    (state) => state.removeItemFromCart
  );
  const updateSizes = useCartStore((state) => state.updateSizes);

  const itemInCart = cartItems.find((item) => item.id === productItem.id);
  const quantity = itemInCart?.quantity || 0;

  const handleSizeChange = (index: number, size: ProductSizeType) => {
    const currentSizes =
      itemInCart?.selectedSizes ||
      Array(quantity).fill("LG" as ProductSizeType);
    const newSizes = [...currentSizes];
    newSizes[index] = size;
    updateSizes(productItem.id, newSizes);
  };

  if (isLoading) return <CheckoutProductSkeleton />;

  const productImage =
    productItem.images?.[0]?.imageUrl || "/placeholder-product.jpg";
  const price =
    productItem.price instanceof Prisma.Decimal
      ? parseFloat(productItem.price.toString())
      : typeof productItem.price === "string"
      ? parseFloat(productItem.price)
      : productItem.price;

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2 py-4">
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

      <div className="col-span-1 md:col-span-3 space-y-2 md:ms-6 md:mx-5">
        <p>{productItem.name}</p>
        <div>
          <StarRating />
        </div>
        <p className="text-xs my-2 line-clamp-3">{productItem.description}</p>
        <Currency price={price} />
        {hasPrime && <HasPrime />}
      </div>

      <div className="flex flex-col space-y-4 items-end w-full">
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

        {quantity > 0 && (
          <div className="space-y-2 w-full flex flex-col items-end">
            {Array.from({ length: quantity }).map((_, index) => (
              <div key={index} className="flex items-center justify-end gap-2">
                <Select
                  value={itemInCart?.selectedSizes?.[index] || "LG"}
                  onValueChange={(value) =>
                    handleSizeChange(index, value as ProductSizeType)
                  }
                  disabled={loadingSizes}
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="LG" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((sizeItem) => (
                      <SelectItem key={sizeItem.size} value={sizeItem.size}>
                        {sizeItem.size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => removeProductFromCart(productItem.id)}
          className="button"
        >
          Remove From Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;

// import React from "react";
// import Image from "next/image";
// import { Minus, Plus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { useQuery } from "@tanstack/react-query";
// import StarRating from "../StarRating/StartRating";
// import Currency from "../Currency/Currency";
// import HasPrime from "../HasPrime/HasPrime";
// import useCartStore from "@/app/stores/useCartStore";
// import { ProductWithDetails } from "@/app/types/entities";
// import { Prisma, ProductSize } from "@prisma/client";
// import CheckoutProductSkeleton from "../Skeletons/CheckoutProductSkeleton/CheckoutProductSkeleton";

// // Define size type based on your schema
// type ProductSizeType = "LG" | "XL" | "XXL";

// interface Props {
//   productItem: ProductWithDetails;
//   isLoading?: boolean;
// }

// const fetchProductSizes = async (productId: number): Promise<ProductSize[]> => {
//   const response = await fetch(`/api/products/${productId}/sizes`);
//   if (!response.ok) throw new Error("Failed to fetch sizes");
//   return response.json();
// };

// const CheckoutProduct = ({ productItem, isLoading = false }: Props) => {
//   const [hasPrime] = React.useState(Math.random() < 0.5);

//   const { data: sizes = [], isLoading: loadingSizes } = useQuery({
//     queryKey: ["productSizes", productItem.id],
//     queryFn: () => fetchProductSizes(productItem.id),
//     staleTime: 5 * 60 * 1000,
//   });

//   const cartItems = useCartStore((state) => state.cartItems);
//   const increaseQuantity = useCartStore((state) => state.increaseQuantity);
//   const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
//   const removeProductFromCart = useCartStore(
//     (state) => state.removeItemFromCart
//   );
//   const updateSizes = useCartStore((state) => state.updateSizes);

//   const itemInCart = cartItems.find((item) => item.id === productItem.id);
//   const quantity = itemInCart?.quantity || 0;

//   const handleSizeChange = (index: number, size: ProductSizeType) => {
//     const currentSizes =
//       itemInCart?.selectedSizes ||
//       Array(quantity).fill("LG" as ProductSizeType);
//     const newSizes = [...currentSizes];
//     newSizes[index] = size;
//     updateSizes(productItem.id, newSizes);
//   };

//   if (isLoading) return <CheckoutProductSkeleton />;

//   const productImage =
//     productItem.images?.[0]?.imageUrl || "/placeholder-product.jpg";
//   const price =
//     productItem.price instanceof Prisma.Decimal
//       ? parseFloat(productItem.price.toString())
//       : typeof productItem.price === "string"
//       ? parseFloat(productItem.price)
//       : productItem.price;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-5 gap-2 py-4">
//       <div className="relative h-[200px] md:h-[160px] w-full md:w-[150px] mx-auto md:ms-3">
//         <Image
//           src={productImage}
//           alt=""
//           loading="lazy"
//           fill
//           quality={100}
//           className="object-contain"
//         />
//       </div>

//       <div className="col-span-1 md:col-span-3 space-y-2 md:ms-6 md:mx-5">
//         <p>{productItem.name}</p>
//         <div>
//           <StarRating />
//         </div>
//         <p className="text-xs my-2 line-clamp-3">{productItem.description}</p>
//         <Currency price={price} />
//         {hasPrime && <HasPrime />}
//       </div>

//       <div className="flex flex-col space-y-4 items-end w-full">
//         <div className="flex items-center space-x-2">
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-8 w-8"
//             onClick={() => decreaseQuantity(productItem.id)}
//             disabled={quantity === 0}
//           >
//             <Minus className="h-4 w-4" />
//           </Button>
//           <span className="w-8 text-center font-medium">{quantity}</span>
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-8 w-8"
//             onClick={() => increaseQuantity(productItem.id)}
//           >
//             <Plus className="h-4 w-4" />
//           </Button>
//         </div>

//         {quantity > 0 && (
//           <div className="space-y-2 w-full flex flex-col items-end">
//             {Array.from({ length: quantity }).map((_, index) => (
//               <div key={index} className="flex items-center justify-end gap-2">
//                 <Select
//                   value={itemInCart?.selectedSizes?.[index] || "LG"}
//                   onValueChange={(value) =>
//                     handleSizeChange(index, value as ProductSizeType)
//                   }
//                   disabled={loadingSizes}
//                 >
//                   <SelectTrigger className="w-24">
//                     <SelectValue placeholder="LG" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {sizes.map((sizeItem) => (
//                       <SelectItem key={sizeItem.size} value={sizeItem.size}>
//                         {sizeItem.size}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           onClick={() => removeProductFromCart(productItem.id)}
//           className="button"
//         >
//           Remove From Basket
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutProduct;
