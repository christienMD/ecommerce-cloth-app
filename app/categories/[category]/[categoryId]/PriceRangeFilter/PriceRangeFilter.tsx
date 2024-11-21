"use client";

import { Slider } from "@/components/ui/slider";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";

const MAX_PRICE = 50_000;
const STEP_SIZE = 1000;

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "XAF",
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace("XAF", "FCFA");
};

const PriceRangeFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialMinPrice = Number(searchParams.get("minPrice")) || 0;
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || MAX_PRICE;

  const [priceRange, setPriceRange] = useState<number[]>([
    Math.min(initialMinPrice, MAX_PRICE),
    Math.min(initialMaxPrice, MAX_PRICE),
  ]);

  const debouncedPriceRange = useDebounce(priceRange, 500);

  const updateUrl = useCallback(
    (minPrice: number, maxPrice: number) => {
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      if (minPrice > 0) {
        current.set("minPrice", minPrice.toString());
      } else {
        current.delete("minPrice");
      }

      if (maxPrice < MAX_PRICE) {
        current.set("maxPrice", maxPrice.toString());
      } else {
        current.delete("maxPrice");
      }

      const page = searchParams.get("page");
      if (page) {
        current.set("page", "1");
      }

      const search = current.toString();
      const query = search ? `?${search}` : "";

      router.push(`${pathname}${query}`);
    },
    [pathname, router, searchParams]
  );

  useEffect(() => {
    updateUrl(debouncedPriceRange[0], debouncedPriceRange[1]);
  }, [debouncedPriceRange, updateUrl]);

  return (
    <div className="space-y-6 bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold text-amazon_blue">Price Range</h3>
      <div className="space-y-6">
        <Slider
          min={0}
          max={MAX_PRICE}
          step={STEP_SIZE}
          value={priceRange}
          onValueChange={(value) => {
            setPriceRange(value);
          }}
          className="w-full"
        />
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between text-sm px-2">
          <div className="flex flex-col">
            <span className="text-gray-500 mb-1">Minimum</span>
            <span className="font-medium text-base">
              {formatCurrency(priceRange[0])}
            </span>
          </div>
          <div className="flex flex-col text-right sm:text-left">
            <span className="text-gray-500 mb-1">Maximum</span>
            <span className="font-medium text-base">
              {formatCurrency(priceRange[1])}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceRangeFilter;
