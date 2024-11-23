// hooks/useSearch.ts
import { ProductWithDetails } from "@/app/types/entities";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface SearchResponse {
  products: ProductWithDetails[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
  };
}

const useSearch = (searchTerm: string, page: number = 1) => {
  const fetchSearchResults = async () => {
    const response = await axios.get<SearchResponse>(
      `/api/search?search=${encodeURIComponent(searchTerm)}&page=${page}`
    );
    return response.data;
  };

  return useQuery<SearchResponse, Error>({
    queryKey: ["search", searchTerm, page],
    queryFn: fetchSearchResults,
    enabled: !!searchTerm,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });
};

export default useSearch;