"use client";

import Link from "next/link";
import Logo from "@/app/components/Logo/Logo";

const Footer = () => {
  const footerLinks = [
    {
      title: "Style Guide",
      subtitle: "Find your perfect style match",
      href: "#",
    },
    {
      title: "Dress Collections",
      subtitle: "Browse seasonal collections",
      href: "#",
    },
    {
      title: "Fashion Blog",
      subtitle: "Tips, Trends & Inspirations",
      href: "#",
    },
    {
      title: "Personal Styling",
      subtitle: "Get expert fashion advice",
      href: "#",
    },
    {
      title: "Sustainable Fashion",
      subtitle: "Our eco-friendly collection",
      href: "#",
    },
    {
      title: "Size Guide",
      subtitle: "Find your perfect fit",
      href: "#",
    },
    {
      title: "Designer Corner",
      subtitle: "Exclusive designer pieces",
      href: "#",
    },
    {
      title: "Fashion Events",
      subtitle: "Shows & private viewings",
      href: "#",
    },
    {
      title: "Business Account",
      subtitle: "Special pricing for boutiques",
      href: "#",
    },
    {
      title: "Gift Cards",
      subtitle: "The perfect gift for fashion lovers",
      href: "#",
    },
  ];

  return (
    <footer className="bg-amazon_blue text-white">
      {/* Newsletter Section (Replaces Language Selector) */}
      <div className="border-b border-gray-700">
        <div className="max-w-7xl mx-auto py-8 px-4">
          <div className="flex flex-col items-center text-center space-y-4">
            <h3 className="text-lg font-semibold">
              Join the Fashion Revolution
            </h3>
            <p className="text-sm text-gray-300">
              Subscribe to get exclusive offers and style updates
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-white/10 border border-gray-600 focus:outline-none focus:border-white"
              />
              <button className="px-6 py-2 bg-yellow-400 text-amazon_blue font-semibold rounded-md hover:bg-yellow-500 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {footerLinks.map((link, index) => (
            <div key={index} className="flex flex-col space-y-1">
              <Link
                href={link.href}
                className="text-sm hover:underline text-blue-400"
              >
                {link.title}
              </Link>
              <p className="text-xs text-gray-400">{link.subtitle}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <Logo/>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
              <Link href="#" className="hover:underline">
                Terms & Conditions
              </Link>
              <Link href="#" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:underline">
                Shipping Info
              </Link>
              <Link href="#" className="hover:underline">
                Cookie Policy
              </Link>
              <Link href="#" className="hover:underline">
                Refund Policy
              </Link>
            </div>

            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()} Dress Realm. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
