import { Product, Prisma } from "@prisma/client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductWithDetails } from "../types/entities";

// Extend the Product type to include quantity and handle Decimal
interface CartItem extends Omit<ProductWithDetails, "price"> {
  quantity: number;
  price: number | string | Prisma.Decimal;
}

interface CartState {
  cartItems: CartItem[];
  getTotalItems: () => number;
  itemsTotalPrice: (products: CartItem[]) => string;
}

interface CartActions {
  addProductToCart: (item: ProductWithDetails) => void;
  removeItemFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
}

// Helper function to convert Prisma.Decimal to number
const convertToNumber = (price: number | string | Prisma.Decimal): number => {
  if (typeof price === "number") return price;
  if (typeof price === "string") return parseFloat(price);
  return parseFloat(price.toString());
};

const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addProductToCart: (item: ProductWithDetails) => {
        const existingItem = get().cartItems.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          const updatedItems = get().cartItems.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
          set({ cartItems: updatedItems });
        } else {
          // Convert price to number when adding new item
          const newItem: CartItem = {
            ...item,
            price: convertToNumber(item.price),
            quantity: 1,
            category: item.category,
            images: item.images,
          };
          set({ cartItems: [...get().cartItems, newItem] });
        }
      },

      removeItemFromCart: (productId) => {
        const updatedCartItems = get().cartItems.filter(
          (item) => item.id !== productId
        );
        set({ cartItems: updatedCartItems });
      },

      increaseQuantity: (productId) => {
        const updatedItems = get().cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ cartItems: updatedItems });
      },

      decreaseQuantity: (productId) => {
        const itemExists = get().cartItems.find(
          (item) => item.id === productId
        );

        if (itemExists) {
          if (itemExists.quantity === 1) {
            const updatedCartItems = get().cartItems.filter(
              (item) => item.id !== productId
            );
            set({ cartItems: updatedCartItems });
          } else {
            const updatedItems = get().cartItems.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            );
            set({ cartItems: updatedItems });
          }
        }
      },

      itemsTotalPrice: (products: CartItem[]) => {
        const total = products.reduce((total, product) => {
          const price = convertToNumber(product.price);
          return total + price * product.quantity;
        }, 0);

        return total.toFixed(2);
      },

      getTotalItems: () => {
        return get().cartItems.reduce(
          (total, item) => total + item.quantity,
          0
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
);

// Initialize the store immediately
if (typeof window !== "undefined") {
  useCartStore.persist.rehydrate();
}

export default useCartStore;
