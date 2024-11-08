import CartBasket from "@/app/components/CartBasket/CartBasket";
import Logo from "@/app/components/Logo/Logo";
import Search from "@/app/components/Search/Search";
import UserProfile from "@/app/components/UserProfile/UserProfile";
import { auth } from "@/auth";
import { Menu } from "lucide-react";
import Link from "next/link";

const Navbar = async () => {
  const session = await auth();

  const bottomNavLinks = [
    { id: "video", href: "/", label: "Prime Video" },
    { id: "deals", href: "/", label: "Today's Deals" },
    { id: "orders", href: "/orders", label: "Returns & Orders" },
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
          {session?.user ? (
            <UserProfile
              name={session.user.name ?? null}
              email={session.user.email ?? null}
              image={session.user.image ?? null}
            />
          ) : (
            <Link href="/api/auth/signin" className="link">
              <p>Sign In</p>
              <p className="font-extrabold md:text-sm">Account & Lists</p>
            </Link>
          )}

          <Link href="/orders" className="link hidden sm:block">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </Link>

          <CartBasket />
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
        <Link href="/orders" className="hidden sm:hidden">
          <p>Returns</p>
          <p className="font-extrabold md:text-sm">& Orders</p>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
