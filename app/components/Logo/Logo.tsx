"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      alt="header"
      src="https://links.papareact.com/f90"
      height={160}
      width={70}
      className="object-contain cursor-pointer mx-2"
    />
  );
};

export default Logo;
