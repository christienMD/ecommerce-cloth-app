import CartBasket from "@/app/components/CartBasket/CartBasket";
import Logo from "@/app/components/Logo/Logo";
import Search from "@/app/components/Search/Search";
import UserProfile from "@/app/components/UserProfile/UserProfile";
import { auth } from "@/auth";
import Link from "next/link";
import Sidebar from "../Sidebar/Sidebar";

const Navbar = async () => {
  const session = await auth();

  const bottomNavLinks = [
    { id: "all", href: "/", label: "All Products" },
    { id: "new", href: "/", label: "New Arrivals" },
    { id: "deals", href: "/", label: "Today's Deals" },
    { id: "orders", href: "/orders", label: "Returns & Orders" },
    {
      id: "featured",
      href: "/",
      label: "Featured",
      className: "hidden lg:inline-flex",
    },
    {
      id: "trending",
      href: "/",
      label: "Trending",
      className: "hidden lg:inline-flex",
    },
    {
      id: "bestsellers",
      href: "/",
      label: "Best Sellers",
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
        <Sidebar />
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
