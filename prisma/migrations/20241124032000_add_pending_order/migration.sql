-- CreateTable
CREATE TABLE "PendingOrder" (
    "id" TEXT NOT NULL,
    "cartData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "PendingOrder_pkey" PRIMARY KEY ("id")
);
