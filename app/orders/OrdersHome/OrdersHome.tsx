import React from 'react';
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import { CheckCircle, XCircle, Clock, Package } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Currency from "@/app/components/Currency/Currency";
import { Order, OrderItem, Product, ProductImage } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product & {
      images: ProductImage[];
    };
  })[];
};

type OrderStatus = "SUCCESSFUL" | "FAILED" | "EXPIRED" | "PENDING";

const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const styles = {
    SUCCESSFUL: "bg-green-50 text-green-700 border-green-200 ring-green-600/20",
    FAILED: "bg-red-50 text-red-700 border-red-200 ring-red-600/20",
    EXPIRED: "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-600/20",
    PENDING: "bg-gray-50 text-gray-700 border-gray-200 ring-gray-600/20"
  } as const;

  const icons = {
    SUCCESSFUL: <CheckCircle className="h-4 w-4" />,
    FAILED: <XCircle className="h-4 w-4" />,
    EXPIRED: <Clock className="h-4 w-4" />,
    PENDING: <Clock className="h-4 w-4" />
  } as const;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border ring-1 ring-inset ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

export default async function OrdersHome() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">Sign in Required</h3>
              <p className="mt-1 text-sm text-gray-500">Please login to view your orders</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const orders = await prisma.order.findMany({
    where: {
      user: {
        email: session.user.email,
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
    },
    orderBy: {
      createdAt: "desc",
    },
  }) as OrderWithItems[];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
            <p className="mt-2 text-sm text-gray-600">
              View and track all your orders in one place
            </p>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="py-16">
                <div className="text-center">
                  <Package className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No orders yet</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    When you make a purchase, your orders will appear here
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px] text-nowrap">Order ID</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Payment Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            {order.items.slice(0, 3).map((item) => (
                              <div key={item.id} className="relative h-12 w-12 flex-shrink-0">
                                <Image
                                  src={item.product.images[0]?.imageUrl || "/placeholder.jpg"}
                                  alt={item.product.name}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                            ))}
                            {order.items.length > 3 && (
                              <span className="text-sm text-gray-500">
                                +{order.items.length - 3} more
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-[200px]">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="text-sm text-gray-600 truncate">
                                {item.quantity}x {item.product.name}
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </TableCell>
                        <TableCell>
                          <Currency price={Number(order.totalAmount)} />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={order.status as OrderStatus} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}