// app/api/products/[id]/sizes/route.ts

import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const sizes = await prisma.productSize.findMany({
      where: {
        productId: parseInt(params.id)
      },
      orderBy: {
        size: 'asc'
      }
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    return NextResponse.json(
      { error: "Failed to fetch sizes" },
      { status: 500 }
    );
  }
}