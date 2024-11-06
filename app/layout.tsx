import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./components/sections/Navbar/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import QueryClientProvider from "./components/QueryClientProvider/QueryClientProvider";
import Footer from "./components/sections/Footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Dress Realm | Premium Fashion E-commerce Platform",
    template: "%s | Dress Realm",
  },
  description:
    "Discover Dress Realm's curated collection of premium clothing. Shop the latest fashion trends with our easy-to-use e-commerce platform featuring detailed product variants, size guides, and seamless shopping experience.",
  keywords: [
    "fashion",
    "clothing store",
    "online shopping",
    "premium clothing",
    "dress realm",
    "fashion e-commerce",
    "clothing variants",
    "designer clothes",
    "fashion retail",
    "online fashion store",
  ],
  authors: [{ name: "Dress Realm" }],
  creator: "Dress Realm",
  publisher: "Dress Realm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster />
          <Footer />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </body>
    </html>
  );
}
