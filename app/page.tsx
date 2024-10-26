import Banner from "./components/sections/Banner/Banner";
import ProductFeed from "./components/sections/ProductFeed/ProductFeed";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        {/* products */}
        <ProductFeed />
      </main>
    </div>
  );
}
