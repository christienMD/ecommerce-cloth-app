"use client";

import { useState } from "react";
import useCartStore, { useHydration } from "@/app/stores/useCartStore";
import Image from "next/image";
import CheckoutProduct from "../../CheckoutProduct/CheckoutProduct";
import Currency from "../../Currency/Currency";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Phone, MessageSquare } from "lucide-react";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

interface Props {
  userEmail: string | undefined | null;
}

const CartItemFeed = ({ userEmail }: Props) => {
  const hydrated = useHydration();
  const { cartItems, getTotalItems, itemsTotalPrice, clearCart } =
    useCartStore();
  const totalItems = getTotalItems();
  const [isProcessing, setIsProcessing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^((\+|00)?237|0)?[6-9][5-9][0-9]{7}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const initiatePayment = async () => {
    try {
      console.log("Starting payment process...");
      setPhoneError("");

      if (!phoneNumber.trim()) {
        setPhoneError("Phone number is required");
        toast.error("Please enter your phone number");
        return;
      }

      const cleanPhone = phoneNumber.replace(/\s/g, "");
      if (!validatePhoneNumber(cleanPhone)) {
        setPhoneError("Please enter a valid Cameroon phone number");
        toast.error("Please enter a valid Cameroon phone number");
        return;
      }

      setIsProcessing(true);

      const amount = parseInt(itemsTotalPrice(cartItems));
      console.log("Cart amount:", amount);

      if (amount < 100) {
        toast.error("Minimum payment amount is 100 FCFA");
        return;
      }

      for (const item of cartItems) {
        const validSizes = item.selectedSizes.filter(
          (size) => size && size !== ""
        );
        if (validSizes.length !== item.quantity) {
          toast.error(
            `Please select all sizes for ${item.name}. Quantity: ${item.quantity}, Selected: ${validSizes.length}`
          );
          return;
        }
      }

      const paymentData = {
        amount,
        cartId: `cart-${Date.now()}`,
        email: userEmail,
        phone: cleanPhone,
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
          selectedSizes: item.selectedSizes,
        })),
      };

      console.log("Sending payment data:", paymentData);

      const response = await fetch("/api/payment/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Payment initiation failed");
      }

      const data = await response.json();
      console.log("Payment response:", data);

      localStorage.setItem("fapshi_transaction", data.transId);
      localStorage.setItem("cart_data", JSON.stringify(paymentData));

      toast.info("Redirecting to payment page...");
      window.location.href = data.link;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Payment error:", error);
      toast.error(error.message || "Failed to initiate payment");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left section - maintained original width */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            alt="checkout-img"
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            className="object-contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-between items-center border-b pb-5">
              <h1 className="text-3xl">
                {!hydrated ? (
                  <Skeleton className="h-9 w-64" />
                ) : cartItems.length === 0 ? (
                  "Your Rehoboth wears Shopping Basket is empty"
                ) : (
                  "Shopping Basket"
                )}
              </h1>
              {hydrated && cartItems.length > 0 && (
                <Button
                  variant="destructive"
                  onClick={clearCart}
                  className="flex items-center gap-2"
                  disabled={isProcessing}
                >
                  <Trash2 className="h-4 w-4" />
                  Clear your basket
                </Button>
              )}
            </div>

            {!hydrated
              ? [...Array(3)].map((_, index) => (
                  <CheckoutProduct
                    key={index}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    productItem={{} as any}
                    isLoading={true}
                  />
                ))
              : cartItems.map((productItem, index) => (
                  <CheckoutProduct
                    key={index}
                    productItem={productItem}
                    isLoading={false}
                  />
                ))}
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col bg-white p-10 shadow-md lg:w-96">
          {!hydrated ? (
            <div className="space-y-3">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            cartItems.length > 0 && (
              <>
                <h2 className="whitespace-nowrap text-lg font-bold">
                  Subtotal ({totalItems} items):
                </h2>

                <span className="text-xl font-bold mb-6">
                  <Currency price={parseInt(itemsTotalPrice(cartItems))} />
                </span>

                {/* Phone Number Input with Icons */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number*
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setPhoneError("");
                    }}
                    className={`w-full ${phoneError ? "border-red-500" : ""}`}
                  />
                  {phoneError ? (
                    <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                  ) : (
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4" />
                        <span>Must be reachable for calls</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MessageSquare className="h-4 w-4" />
                        <span>Must be active on WhatsApp</span>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  className="w-full h-16 bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 
                    hover:from-yellow-300 hover:text-gray-800 text-gray-900 font-semibold
                    disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={initiatePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="text-sm flex flex-col justify-center w-full h-20 p-4 py-6">
                      <div className="flex flex-wrap items-center gap-1 h-20 hover:text-gray-200">
                        Proceed with <span className="font-bold">SECURED</span>
                        payment via <span className="font-bold">MOMO</span>
                        through <span className="font-bold">FAPSHI</span>
                      </div>
                    </div>
                  )}
                </Button>

                <p className="mt-3 text-xs text-gray-500 text-center">
                  Secure payment powered by Fapshi
                </p>
              </>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default CartItemFeed;

// "use client";

// import { useState } from "react";
// import useCartStore, { useHydration } from "@/app/stores/useCartStore";
// import Image from "next/image";
// import CheckoutProduct from "../../CheckoutProduct/CheckoutProduct";
// import Currency from "../../Currency/Currency";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Trash2, Loader2 } from "lucide-react";
// import { toast } from "react-toastify";

// const CartItemFeed = () => {
//   const hydrated = useHydration();
//   const { cartItems, getTotalItems, itemsTotalPrice, clearCart } =
//     useCartStore();
//   const totalItems = getTotalItems();
//   const [isProcessing, setIsProcessing] = useState(false);

//   const initiatePayment = async () => {
//     try {
//       setIsProcessing(true);

//       // Get total amount from cart
//       const amount = parseInt(itemsTotalPrice(cartItems));

//       // Basic validation
//       if (amount < 100) {
//         toast.error("Minimum payment amount is 100 FCFA");
//         return;
//       }

//       // Create payment request
//       const response = await fetch("/api/payment/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           amount,
//           cartId: `cart-${Date.now()}`, // Unique identifier for the transaction
//         }),
//       });

//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Payment initiation failed");
//       }

//       const data = await response.json();
//       console.log("Payment Link Generated:", data); // Log the response

//       toast.success("Payment link generated successfully!");

//       // For now, just log the payment link
//       console.log("Payment Link:", data.link);
//       console.log("Transaction ID:", data.transId);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     } catch (error: any) {
//       console.error("Payment error:", error);
//       toast.error(error.message || "Failed to initiate payment");
//     } finally {
//       setIsProcessing(false);
//     }
//   };

// "use client";

// import { useState } from "react";
// import useCartStore, { useHydration } from "@/app/stores/useCartStore";
// import Image from "next/image";
// import CheckoutProduct from "../../CheckoutProduct/CheckoutProduct";
// import Currency from "../../Currency/Currency";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Trash2, Loader2 } from "lucide-react";
// import { toast } from "react-toastify";

// interface Props {
//   userEmail: string | undefined | null;
// }

// const CartItemFeed = ({ userEmail }: Props) => {
//   const hydrated = useHydration();
//   const { cartItems, getTotalItems, itemsTotalPrice, clearCart } =
//     useCartStore();
//   const totalItems = getTotalItems();
//   const [isProcessing, setIsProcessing] = useState(false);

// const initiatePayment = async () => {
//   try {
//     console.log("Starting payment process...");
//     setIsProcessing(true);

//     const amount = parseInt(itemsTotalPrice(cartItems));
//     console.log("Cart amount:", amount);

//     if (amount < 100) {
//       toast.error("Minimum payment amount is 100 FCFA");
//       return;
//     }

//     // Log cart state
//     console.log("Current cart items:", cartItems);

//     // Validate sizes
//     // for (const item of cartItems) {
//     //   console.log(`Checking sizes for ${item.name}:`, item.selectedSizes);

//     //   if (!item.selectedSizes || !Array.isArray(item.selectedSizes)) {
//     //     console.log("No sizes array found for item");
//     //     toast.error(`Please select sizes for ${item.name}`);
//     //     return;
//     //   }

//     //   const validSizes = item.selectedSizes.filter(
//     //     (size) => size && size.length > 0
//     //   );
//     //   console.log("Valid sizes count:", validSizes.length);
//     //   console.log("Required quantity:", item.quantity);

//     //   if (validSizes.length !== item.quantity) {
//     //     toast.error(`Please select sizes for all ${item.name} items`);
//     //     return;
//     //   }
//     // }
//     // In initiatePayment function
//     for (const item of cartItems) {
//       const validSizes = item.selectedSizes.filter(
//         (size) => size && size !== ""
//       );
//       if (validSizes.length !== item.quantity) {
//         toast.error(
//           `Please select all sizes for ${item.name}. Quantity: ${item.quantity}, Selected: ${validSizes.length}`
//         );
//         return;
//       }
//     }

//     const paymentData = {
//       amount,
//       cartId: `cart-${Date.now()}`,
//       email: userEmail,
//       items: cartItems.map((item) => ({
//         productId: item.id,
//         quantity: item.quantity,
//         price: item.price,
//         selectedSizes: item.selectedSizes,
//       })),
//     };

//     console.log("Sending payment data:", paymentData);

//     const response = await fetch("/api/payment/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(paymentData),
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || "Payment initiation failed");
//     }

//     const data = await response.json();
//     console.log("Payment response:", data);

//     localStorage.setItem("fapshi_transaction", data.transId);
//     localStorage.setItem("cart_data", JSON.stringify(paymentData));

//     toast.info("Redirecting to payment page...");
//     window.location.href = data.link;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     console.error("Payment error:", error);
//     toast.error(error.message || "Failed to initiate payment");
//   } finally {
//     setIsProcessing(false);
//   }
// };

//   return (
//     <div className="bg-gray-100">
//       <main className="lg:flex mx-3 md:mx-8">
// {/* left */}
// <div className="flex-grow my-5 shadow-sm">
//   <Image
//     alt="checkout-img"
//     src="https://links.papareact.com/ikj"
//     width={800}
//     height={245}
//     className="object-contain"
//   />

//   <div className="flex flex-col p-5 space-y-10 bg-white">
//     <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-between items-center border-b pb-5">
//       <h1 className="text-3xl">
//         {!hydrated ? (
//           <Skeleton className="h-9 w-64" />
//         ) : cartItems.length === 0 ? (
//           "Your Rehoboth wears Shopping Basket is empty"
//         ) : (
//           "Shopping Basket"
//         )}
//       </h1>
//       {hydrated && cartItems.length > 0 && (
//         <Button
//           variant="destructive"
//           onClick={clearCart}
//           className="flex items-center gap-2"
//           disabled={isProcessing}
//         >
//           <Trash2 className="h-4 w-4" />
//           Clear your basket
//         </Button>
//       )}
//     </div>

//     {!hydrated
//       ? // Show skeleton items while loading
//         [...Array(3)].map((_, index) => (
//           <CheckoutProduct
//             key={index}
//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//             productItem={{} as any}
//             isLoading={true}
//           />
//         ))
//       : cartItems.map((productItem, index) => (
//           <CheckoutProduct
//             key={index}
//             productItem={productItem}
//             isLoading={false}
//           />
//         ))}
//   </div>
// </div>

//         {/* right */}
//         <div className="flex flex-col bg-white p-10 shadow-md">
//           {!hydrated ? (
//             <div className="space-y-3">
//               <Skeleton className="h-6 w-40" />
//               <Skeleton className="h-6 w-24" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//           ) : (
//             cartItems.length > 0 && (
//               <>
//                 <h2 className="whitespace-nowrap text-lg font-bold">
//                   Subtotal ({totalItems} items):
//                 </h2>

//                 <span className="text-xl font-bold">
//                   <Currency price={parseInt(itemsTotalPrice(cartItems))} />
//                 </span>

//                 <Button
//                   className={`mt-4 h-12 bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300
//               hover:from-yellow-300 hover:text-gray-200 text-black font-semibold
//               ${isProcessing ? "cursor-not-allowed opacity-50" : ""}`}
//                   onClick={initiatePayment}
//                   disabled={isProcessing}
//                 >
//                   {isProcessing ? (
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="h-4 w-4 animate-spin" />
//                       Processing...
//                     </div>
//                   ) : (
//                     "Proceed to payment"
//                   )}
//                 </Button>

//                 <p className="mt-2 text-xs text-gray-500 text-center">
//                   Secure payment powered by Fapshi
//                 </p>
//               </>
//             )
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CartItemFeed;

// "use client";

// import useCartStore, { useHydration } from "@/app/stores/useCartStore";
// import Image from "next/image";
// import CheckoutProduct from "../../CheckoutProduct/CheckoutProduct";
// import Currency from "../../Currency/Currency";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Trash2 } from "lucide-react";

// const CartItemFeed = () => {
//   const hydrated = useHydration();
//   const { cartItems, getTotalItems, itemsTotalPrice, clearCart } =
//     useCartStore();
//   const totalItems = getTotalItems();

//   return (
//     <div className="bg-gray-100">
//       <main className="lg:flex mx-3 md:mx-8">
//         {/* left */}
//         <div className="flex-grow my-5 shadow-sm">
//           <Image
//             alt="checkout-img"
//             src="https://links.papareact.com/ikj"
//             width={800}
//             height={245}
//             className="object-contain"
//           />

//           <div className="flex flex-col p-5 space-y-10 bg-white">
//             <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row justify-between items-center border-b pb-5">
//               <h1 className="text-3xl">
//                 {!hydrated ? (
//                   <Skeleton className="h-9 w-64" />
//                 ) : cartItems.length === 0 ? (
//                   "Your Rehoboth wears Shopping Basket is empty"
//                 ) : (
//                   "Shopping Basket"
//                 )}
//               </h1>
//               {hydrated && cartItems.length > 0 && (
//                 <Button
//                   variant="destructive"
//                   onClick={clearCart}
//                   className="flex items-center gap-2"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                   Clear your basket
//                 </Button>
//               )}
//             </div>

//             {!hydrated
//               ? // Show skeleton items while loading
//                 [...Array(3)].map((_, index) => (
//                   <CheckoutProduct
//                     key={index}
//                     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                     productItem={{} as any}
//                     isLoading={true}
//                   />
//                 ))
//               : cartItems.map((productItem, index) => (
//                   <CheckoutProduct
//                     key={index}
//                     productItem={productItem}
//                     isLoading={false}
//                   />
//                 ))}
//           </div>
//         </div>

//         {/* right */}
//         <div className="flex flex-col bg-white p-10 shadow-md">
//           {!hydrated ? (
//             <div className="space-y-3">
//               <Skeleton className="h-6 w-40" />
//               <Skeleton className="h-6 w-24" />
//               <Skeleton className="h-10 w-full" />
//             </div>
//           ) : (
//             cartItems.length > 0 && (
//               <>
//                 <h2 className="whitespace-nowrap text-lg font-bold">
//                   Subtotal ({totalItems} items):
//                 </h2>

//                 <span>
//                   <Currency price={parseInt(itemsTotalPrice(cartItems))} />
//                 </span>

//                 <button
//                   role="link"
//                   className="button mt-2 bg-gradient-to-b from-yellow-200 to-yellow-400 border-yellow-300 hover:from-yellow-300"
//                   onClick={() => {
//                     // Handle checkout process here
//                     // this button will only be visible to authenticated users
//                   }}
//                 >
//                   Proceed to checkout
//                 </button>
//               </>
//             )
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CartItemFeed;
