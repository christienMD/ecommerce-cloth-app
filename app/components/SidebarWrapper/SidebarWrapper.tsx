import prisma from "@/prisma/client";
import Sidebar from "../sections/Sidebar/Sidebar";

const SidebarWrapper = async () => {
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <Sidebar categories={categories} />;
};

export default SidebarWrapper;
