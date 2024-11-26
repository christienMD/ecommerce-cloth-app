// app/api/products/[id]/sizes/route.ts
import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Validate ID
    if (!params.id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const productId = parseInt(params.id);

    // Validate parsed ID
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Fetch sizes
    const sizes = await prisma.productSize.findMany({
      where: {
        productId: productId,
      },
      select: {
        id: true,
        size: true,
        stockLevel: true,
      },
      orderBy: {
        size: "asc",
      },
    });

    // If no sizes found, return default sizes
    if (sizes.length === 0) {
      return NextResponse.json([
        { size: "LG", stockLevel: 10 },
        { size: "XL", stockLevel: 10 },
        { size: "XXL", stockLevel: 10 },
      ]);
    }

    return NextResponse.json(sizes);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return NextResponse.json(
      { error: "Failed to fetch sizes" },
      { status: 500 }
    );
  }
}
