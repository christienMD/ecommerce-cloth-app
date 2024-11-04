"use client";

import { Menu, ShoppingCart } from "lucide-react";
import Logo from "@/app/components/Logo/Logo";
import Link from "next/link";
import Search from "../../Search/Search";
import CartIcon from "../../CartIcon/CartIcon";

const Header = () => {
  const topNavLinks = [
    {
      id: "account",
      href: "/account",
      title: "Sign In",
      subtitle: "Account & Lists",
    },
    {
      id: "orders",
      href: "/orders",
      title: "Returns",
      subtitle: "& Orders",
    },
  ];

  const bottomNavLinks = [
    { id: "video", href: "/prime-video", label: "Prime Video" },
    { id: "business", href: "/business", label: "Amazone Business" },
    { id: "deals", href: "/deals", label: "Today's Deals" },
    {
      id: "electronics",
      href: "/electronics",
      label: "Electronics",
      className: "hidden lg:inline-flex",
    },
    {
      id: "grocery",
      href: "/grocery",
      label: "Food & Grocery",
      className: "hidden lg:inline-flex",
    },
    {
      id: "prime",
      href: "/prime",
      label: "Prime",
      className: "hidden lg:inline-flex",
    },
    {
      id: "buy-again",
      href: "/buy-again",
      label: "Buy Again",
      className: "hidden lg:inline-flex",
    },
    {
      id: "toolkit",
      href: "/toolkit",
      label: "Shopper Toolkit",
      className: "hidden lg:inline-flex",
    },
    {
      id: "health",
      href: "/health",
      label: "Health & Personal Care",
      className: "hidden lg:inline-flex",
    },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* top nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2 gap-2">
        <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
          <Logo />
        </div>

        {/* search */}
        <Search />

        {/* right */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6">
          {topNavLinks.map((link) => (
            <Link key={link.id} href={link.href} className="link">
              <p>{link.title}</p>
              <p className="font-extrabold md:text-sm">{link.subtitle}</p>
            </Link>
          ))}
          <CartIcon />
        </div>
      </div>

      {/* bottom nav */}
      <div className="flex space-x-3 p-2 pl-6 items-center bg-amazon_blue-light text-white text-sm">
        <p className="h-6 mr-2 link flex gap-1 items-center">
          <Menu className="h-6" /> All
        </p>
        {bottomNavLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`link ${link.className || ""}`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Header;
