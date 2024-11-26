// app/api/payment/status/[transId]/route.ts

import { fapshiService } from "@/app/services/fapshi";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { transId: string } }
) {
  try {
    const transId = params.transId;
    const status = await fapshiService.getPaymentStatus(transId);

    return NextResponse.json(status);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Failed to get payment status:", error);
    return NextResponse.json(
      { message: error.message || "Failed to get payment status" },
      { status: 500 }
    );
  }
}
