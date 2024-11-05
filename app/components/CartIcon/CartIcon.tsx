import useCartStore from "@/app/store/useCartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartIcon = () => {
  const totalProducts = useCartStore((state) => state.getTotalItems());

  return (
    <Link href="/checkout" className="link relative flex items-center">
      <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-dress_realm-yellow text-center rounded-full text-black font-bold">
        {totalProducts}
      </span>
      <ShoppingCart className="h-10" />
      <p className="hidden md:inline font-extrabold md:text-sm mt-2">Basket</p>
    </Link>
  );
};

export default CartIcon;
