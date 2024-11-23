import Banner from "./components/sections/Banner/Banner";
import ProductFeed from "./components/sections/ProductFeed/ProductFeed";

interface Props {
  searchParams?: { search?: string };
}

export default function Home({searchParams}:Props) {
  return (
    <div className="bg-gray-100">
      <main className="max-w-screen-2xl mx-auto pb-16">
        {/* Banner */}
        {!searchParams?.search && <Banner />}

        {/* products */}
        <ProductFeed searchParams={searchParams} />
      </main>
    </div>
  );
}
