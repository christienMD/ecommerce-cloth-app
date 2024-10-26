
import Image from "next/image";
import { Product } from "../types/entities";
import CheckoutProduct from "../components/CheckoutProduct/CheckoutProduct";
import Currency from "../components/Currency/Currency";

const CheckOutPage = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

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
              {products.length === 0
                ? "Your Amazone Shopping Basket is empty"
                : "Shopping Basket"}
            </h1>

            {products.slice(1, 3).map((productItem, index) => (
              <CheckoutProduct key={index} productItem={productItem} />
            ))}
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {products.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({products.length} items):{" "}
              </h2>
              <span className="font-bold">
                <Currency price={75} />
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

export default CheckOutPage;
