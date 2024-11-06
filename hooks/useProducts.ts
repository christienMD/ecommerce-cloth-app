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
  });
};

export default useProducts;
