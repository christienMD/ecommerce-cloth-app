import { create } from "zustand";
import { ProductWithDetails } from "../types/entities";

interface State {
  products: ProductWithDetails[];
  isLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
}

interface Actions {
  fetchData: () => Promise<void>;
}

const INITIAL_STATE: State = {
  products: [],
  isLoading: false,
  error: null,
};

export const useProductsStore = create<State & Actions>((set) => ({
  products: INITIAL_STATE.products,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  
  fetchData: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      set({ products: data.products, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
