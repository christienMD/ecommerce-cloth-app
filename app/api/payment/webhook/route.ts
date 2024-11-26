// app/api/payment/webhook/route.ts

import { sendOrderNotification } from "@/app/lib/email-service";
import { PaymentStatus } from "@/app/types/payment";
import prisma from "@/prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

enum OrderStatus {
  PENDING = "PENDING",
  SUCCESSFUL = "SUCCESSFUL",
  FAILED = "FAILED",
  EXPIRED = "EXPIRED",
}

export async function POST(request: Request) {
  try {
    const webhookData = (await request.json()) as PaymentStatus;
    console.log("Webhook received:", webhookData);

    switch (webhookData.status) {
      case "SUCCESSFUL":
        return await handleSuccessfulPayment(webhookData);
      case "FAILED":
        return await handleFailedPayment(webhookData);
      case "EXPIRED":
        return await handleExpiredPayment(webhookData);
      default:
        return NextResponse.json({ status: "unknown" });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handleSuccessfulPayment(payment: PaymentStatus) {
  try {
    console.log("1. Starting payment processing with ID:", payment.externalId);

    const pendingOrder = await prisma.pendingOrder.findUnique({
      where: { id: payment.externalId },
    });

    if (!pendingOrder) {
      console.log("No pending order found for ID:", payment.externalId);
      return NextResponse.json(
        { error: "No pending order found" },
        { status: 404 }
      );
    }

    console.log("2. Found pending order:", pendingOrder);

    const cartItems = JSON.parse(pendingOrder.cartData);
    console.log("3. Parsed cart items:", cartItems);

    let user = await prisma.user.findUnique({
      where: { email: payment.email },
    });

    if (!user) {
      console.log("4. Creating new user for:", payment.email);
      user = await prisma.user.create({
        data: {
          email: payment.email,
          username:
            payment.payerName?.toLowerCase().replace(/\s+/g, "_") ||
            payment.email.split("@")[0],
          firstName: payment.payerName?.split(" ")[0] || "Unknown",
          lastName: payment.payerName?.split(" ").slice(1).join(" ") || "User",
          passwordHash: "oauth",
          phoneNumber: pendingOrder.phone || "",
        },
      });
    }

    console.log("5. User:", user);
    console.log(
      "6. Preparing order items:",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      cartItems.map((item: any) => ({
        quantity: item.quantity,
        price: item.price,
        productId: item.productId,
        size: item.selectedSizes[0] || "LG",
      }))
    );

    const order = await prisma.order.create({
      data: {
        status: OrderStatus.SUCCESSFUL,
        totalAmount: pendingOrder.amount,
        userId: user.id,
        items: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          create: cartItems.map((item: any) => ({
            quantity: item.quantity,
            price: new Decimal(item.price),
            productId: item.productId,
            size: item.selectedSizes[0] || "LG",
          })),
        },
      },
      include: {
        items: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
        user: true,
      },
    });

    console.log("7. Created order:", order);

    // Send email notification
    try {
      console.log("8. Sending email notification");
      await sendOrderNotification({
        ...order,
        customerDetails: {
          name: payment.payerName || "Unknown",
          email: payment.email,
          phone: pendingOrder.phone || "No phone provided",
        },
      });
      console.log("9. Email notification sent successfully");
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
    }

    await prisma.pendingOrder.delete({
      where: { id: payment.externalId },
    });

    console.log("10. Deleted pending order");
    return NextResponse.json(order);
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}

async function handleFailedPayment(payment: PaymentStatus) {
  try {
    let user = await prisma.user.findUnique({
      where: { email: payment.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payment.email,
          username:
            payment.payerName?.toLowerCase().replace(/\s+/g, "_") ||
            payment.email.split("@")[0],
          firstName: payment.payerName?.split(" ")[0] || "Unknown",
          lastName: payment.payerName?.split(" ").slice(1).join(" ") || "User",
          passwordHash: "oauth",
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        status: OrderStatus.FAILED,
        totalAmount: new Decimal(payment.amount),
        userId: user.id,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Failed payment error:", error);
    return NextResponse.json(
      { error: "Failed to process failed payment" },
      { status: 500 }
    );
  }
}

async function handleExpiredPayment(payment: PaymentStatus) {
  try {
    let user = await prisma.user.findUnique({
      where: { email: payment.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email: payment.email,
          username:
            payment.payerName?.toLowerCase().replace(/\s+/g, "_") ||
            payment.email.split("@")[0],
          firstName: payment.payerName?.split(" ")[0] || "Unknown",
          lastName: payment.payerName?.split(" ").slice(1).join(" ") || "User",
          passwordHash: "oauth",
        },
      });
    }

    const order = await prisma.order.create({
      data: {
        status: OrderStatus.EXPIRED,
        totalAmount: new Decimal(payment.amount),
        userId: user.id,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Expired payment error:", error);
    return NextResponse.json(
      { error: "Failed to process expired payment" },
      { status: 500 }
    );
  }
}
