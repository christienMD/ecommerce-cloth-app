// hooks/useInfiniteProducts.ts
import { ProductWithDetails } from "@/app/types/entities";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

interface ProductsResponse {
  products: ProductWithDetails[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
  };
}

const useInfiniteProducts = (pageSize: number) => {
  const fetchProducts = async ({ pageParam = 1 }) => {
    const { data } = await axios.get<ProductsResponse>(
      `/api/products?page=${pageParam}&pageSize=${pageSize}`
    );
    return data;
  };

  return useInfiniteQuery<ProductsResponse, Error>({
    queryKey: ["infiniteProducts", pageSize],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.currentPage < lastPage.pagination.totalPages) {
        return lastPage.pagination.currentPage + 1;
      }
      return undefined;
    },
    refetchOnMount: false,
    staleTime: 10 * 60 ,
    refetchOnWindowFocus: false
  });
};

export default useInfiniteProducts;
