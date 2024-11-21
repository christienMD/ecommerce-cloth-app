"use client";

import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <div className="relative flex items-center">
        <div className="flex items-center">
          <div className="w-8 sm:w-10 h-8 sm:h-10 bg-dress_realm-yellow rounded-full flex justify-center items-center">
            <span className="text-amazon_blue text-2xl font-bold">R</span>
          </div>
          <div className="relative ml-0">
            <h1 className="text-xl sm:text-2xl font-bold text-white custom-font">
              ehoboth<span className="text-dress_realm-yellow">wears</span>
            </h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
