import { create } from "zustand";
import { Product } from "../types/entities";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  getTotalItems: () => number;
  itemsTotalPrice: (products: CartItem[]) => string;
}

interface CartActions {
  addProductToCart: (item: Product) => void;
  removeItemFromCart: (Item: number) => void;
}

const useCartStore = create<CartState & CartActions>((set, get) => ({
  cartItems: [],

  addProductToCart: (item) => {
    const existingItem = get().cartItems.find(
      (cartItem) => cartItem.id === item.id
    );

    if (existingItem) {
      // Create a new array with the updated item
      const updatedItems = get().cartItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      set({ cartItems: updatedItems });
    } else {
      set({ cartItems: [...get().cartItems, { ...item, quantity: 1 }] });
    }
  },

  removeItemFromCart: (productId) => {
    const itemExists = get().cartItems.find(
      (cartItem) => cartItem.id === productId
    );

    if (itemExists) {
      if (typeof itemExists.quantity === "number") {
        const updatedCartItems = get().cartItems.filter(
          (item) => item.id !== productId
        );
        set({ cartItems: updatedCartItems });
      }
    }
  },

  itemsTotalPrice: (products: CartItem[]) => {
    return products
      .reduce(
        (total, product) =>
          product.price * (product.quantity as number) + total,
        0
      )
      .toFixed(2);
  },

  getTotalItems: () => {
    return get().cartItems.reduce((total, item) => total + item.quantity, 0);
  },
}));

export default useCartStore;
