"use client";

import useCartStore from "@/app/store/useCartStore";
import Image from "next/image";
import CheckoutProduct from "../../CheckoutProduct/CheckoutProduct";
import Currency from "../../Currency/Currency";

const CartItemFeed = () => {
  const { cartItems, getTotalItems, itemsTotalPrice } = useCartStore();
  const totalItems = getTotalItems();

  return (
    <div className="bg-gray-100">
      <main className="lg:flex mx-3 md:mx-8">
        {/* left */}
        <div className="flex-grow my-5 shadow-sm">
          <Image
            alt="checkout-img"
            src="https://links.papareact.com/ikj"
            width={800}
            height={245}
            className="object-contain"
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-5">
              {cartItems.length === 0
                ? "Your DressRealm Shopping Basket is empty"
                : "Shopping Basket"}
            </h1>

            {cartItems.map((productItem, index) => (
              <CheckoutProduct key={index} productItem={productItem} />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {cartItems.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({totalItems} items):{" "}
              </h2>
              <span className="font-bold">
                <Currency price={parseInt(itemsTotalPrice(cartItems))} />
              </span>

              <button
                role="link"
                className={`button mt-2 ${"from-gray-300 to-gray-500 border-gray-200 text-gray-200 cursor-not-allowed"}`}
              >
                {/* {status === "unauthenticated"
                  ? "Sign in to checkout"
                  : "Proceed to checkout"} */}
                Proceed to checkout
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default CartItemFeed;
