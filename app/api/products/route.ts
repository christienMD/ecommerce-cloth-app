// app/api/products/route.ts
import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const maxDuration = 60;

const DEFAULT_PAGE_SIZE = 19;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(
      searchParams.get("pageSize") || DEFAULT_PAGE_SIZE.toString()
    );
    const skip = (page - 1) * pageSize;

    const [products, totalCount] = await prisma.$transaction([
      prisma.product.findMany({
        include: {
          category: true,
          images: true,
          variants: true,
        },
        skip,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.product.count(),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalCount / pageSize),
        totalCount,
        pageSize,
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
