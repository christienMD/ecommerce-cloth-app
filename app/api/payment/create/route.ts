// app/api/payment/create/route.ts

import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cartId = `cart-${Date.now()}`;

    // Store cart data
    await prisma.pendingOrder.create({
      data: {
        id: cartId,
        cartData: JSON.stringify(body.items),
        email: body.email,
        phone: body.phone,
        amount: new Decimal(body.amount),
      },
    });

    // Create Fapshi payment
    const fapshiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_FAPSHI_BASE_URL}/initiate-pay`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apiuser: process.env.FAPSHI_API_USER!,
          apikey: process.env.FAPSHI_API_KEY!,
        },
        body: JSON.stringify({
          amount: body.amount,
          externalId: cartId,
          email: body.email,
          phone: body.phone,
          redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        }),
      }
    );

    const data = await fapshiResponse.json();
    return NextResponse.json(data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Payment creation error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to create payment" },
      { status: 500 }
    );
  }
}

// // app/api/payment/create/route.ts

// import prisma from "@/prisma/client";
// import { Decimal } from "@prisma/client/runtime/library";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     console.log("Payment Creation Body:", body);

//     const cartId = `cart-${Date.now()}`;

//     // Store cart data
//     await prisma.pendingOrder.create({
//       data: {
//         id: cartId,
//         cartData: JSON.stringify(body.items),
//         email: body.email,
//         amount: new Decimal(body.amount),
//       },
//     });

//     const paymentData = {
//       amount: body.amount,
//       externalId: cartId,
//       email: body.email,
//       redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
//     };

//     console.log("Sending to Fapshi:", paymentData);

//     const fapshiResponse = await fetch(
//       `${process.env.NEXT_PUBLIC_FAPSHI_BASE_URL}/initiate-pay`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           apiuser: process.env.FAPSHI_API_USER!,
//           apikey: process.env.FAPSHI_API_KEY!,
//         },
//         body: JSON.stringify(paymentData),
//       }
//     );

//     const data = await fapshiResponse.json();
//     console.log("Fapshi Response:", data);

//     return NextResponse.json(data);
//   } catch (error) {
//     console.error("Payment creation error:", error);

//     // Type guard for Error objects
//     if (error instanceof Error) {
//       return NextResponse.json({ message: error.message }, { status: 500 });
//     }

//     // Fallback for unknown errors
//     return NextResponse.json(
//       { message: "Failed to create payment" },
//       { status: 500 }
//     );
//   }
// }
