import { Product } from "@/app/types/entities";
import Image from "next/image";
import ProductCard from "../../cards/ProductCard/ProductCard";

const ProductFeed = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await res.json();

  return (
    <div className="grid grid-flow-row-dense md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:-mt-52 mx-auto">
      {products.slice(0, 5).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      <div className="relative h-[300px] md:col-span-full mx-5">
        <Image
          className="w-full h-full object-cover"
          src="https://links.papareact.com/dyz"
          alt=""
          fill
          loading="lazy"
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>

      <div className="md:col-span-2">
        {products.slice(5, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.slice(6, products.length).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductFeed;
