import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = 19;
    const skip = (page - 1) * pageSize;

    const [products, totalCount] = await prisma.$transaction([
      prisma.product.findMany({
        where: {
          category: {
            is: {
              isActive: true,
            },
          },
        },
        include: {
          category: true,
          images: true,
          variants: true,
        },
        skip,
        take: pageSize,
      }),
      prisma.product.count({
        where: {
          category: {
            is: {
              isActive: true,
            },
          },
        },
      }),
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
