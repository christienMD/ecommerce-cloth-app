import { ProductWithDetails } from "@/app/types/entities";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useProducts = () => {
  const fetchProducts = async () => {
    const response = await axios.get<{ products: ProductWithDetails[] }>(
      "/api/products?page=1"
    );
    return response.data.products;
  };

  return useQuery<ProductWithDetails[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60,
  });
};

export default useProducts;
