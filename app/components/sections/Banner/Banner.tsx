"use client";

import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "@/public/banner-1.webp";
import banner2 from "@/public/banner-2.webp";
import banner3 from "@/public/banner-3.webp";

const Banner = () => {
  const bannerImages = [
    banner2,
    "https://links.papareact.com/6ff",
    "https://links.papareact.com/7ma",
  ];

  return (
    <div className="relative">
      <div className="absolute w-full h-40 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />

      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {bannerImages.map((src, index) => (
          <div key={index} className="relative h-screen">
            <Image
              quality={100}
              alt="banner-image"
              src={src}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
