import CartBasket from "@/app/components/CartBasket/CartBasket";
import Logo from "@/app/components/Logo/Logo";
import Search from "@/app/components/Search/Search";
import UserProfile from "@/app/components/UserProfile/UserProfile";
import { auth } from "@/auth";
import Link from "next/link";
import SidebarWrapper from "../../SidebarWrapper/SidebarWrapper";

const Navbar = async () => {
  const session = await auth();

  const bottomNavLinks = [
    { id: "all", href: "/products", label: "All Products" },
    { id: "deals", href: "/", label: "Today's Deals" },
    { id: "orders", href: "/orders", label: "Returns & Orders" },
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
    <div className="bg-amazon_blue sticky top-0 z-40">
      <header className="sticky top-0 z-50 container mx-auto">
        {/* top nav */}
        <div className="flex items-center p-2 flex-grow py-2 gap-2">
          <div className="mt-2 flex items-center flex-grow sm:flex-grow-0">
            <Logo />
          </div>

          {/* search */}
          <div className="hidden md:block w-full">
            <Search />
          </div>

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
        <div className="flex space-x-3 p-2 pl-6 xl:pl-2 items-center bg-amazon_blue-light text-white text-sm">
          <SidebarWrapper />
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
    </div>
  );
};

export default Navbar;
