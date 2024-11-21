// app/products/page.tsx
import { Metadata } from "next";
import AllProducts from "./AllProducts/AllProducts";

export const metadata: Metadata = {
  title: "Shop All Products |  Rehoboth Wears",
  description: "Browse our collection of unique and stylish products",
  openGraph: {
    title: "Shop All Products |  Rehoboth Wears",
    description: "Browse our collection of unique and stylish products",
    type: "website",
  },
};

export default function ProductsPage() {
  return <AllProducts />;
}
