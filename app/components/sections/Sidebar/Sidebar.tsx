import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import prisma from "@/prisma/client";

const Sidebar = async () => {
  // Fetch only categories
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // Enhanced function to handle special characters and make URL-safe names
  const formatForUrl = (str: string) => {
    return encodeURIComponent(
      str
        .toLowerCase()
        .replace(/[/\\]/g, "-") 
        .replace(/\s+/g, "-") 
        .replace(/[&]/g, "and") // Replace & with 'and'
        .replace(/[^a-z0-9-]/g, "") // Remove any other special characters
        .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
        .trim() // Remove leading/trailing spaces
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="h-6 mr-2 flex gap-1 items-center text-dress_realm-yellow hover:text-white transition-colors">
          <Menu className="h-6" /> All
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[300px] sm:w-[400px] bg-amazon_blue border-amazon_blue-light"
      >
        <SheetHeader>
          <SheetTitle className="text-dress_realm-yellow">
            Categories
          </SheetTitle>
        </SheetHeader>
        <div className="py-6">
          <div className="flex flex-col space-y-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${formatForUrl(category.name)}/${
                  category.id
                }`}
                className="text-white hover:text-dress_realm-yellow transition-colors p-3 rounded-md hover:bg-amazon_blue-light"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
