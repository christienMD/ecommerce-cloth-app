"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  const router = useRouter();

  return (
    <Link href="/">
      <h1 className="font-bold text-white -tracking-tighter p-1 text-xl">
        <span className="text-dress_realm-yellow">D</span>ress
        <span className="text-dress_realm-yellow">R</span>ealm
      </h1>
    </Link>
  );
};

export default Logo;
