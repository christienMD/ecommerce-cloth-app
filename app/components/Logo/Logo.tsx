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

            {/* <svg
              className="absolute -bottom-4 -left-6"
              width="120%"
              height="20"
              viewBox="0 0 120 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 2 Q 60 20 110 2"
                stroke="#FFC107"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M106 1 L 110 2 L 108 6"
                stroke="#FFC107"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Logo;
