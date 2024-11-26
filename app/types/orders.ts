// app/types/orders.ts
import { Order, OrderItem, Product, ProductImage, User } from "@prisma/client";

export type OrderWithDetails = Order & {
  items: (OrderItem & {
    product: Product & {
      images: ProductImage[];
    };
  })[];
  user: User; // Include user in the type
};

export interface CustomerDetails {
  name: string;
  email: string;
  phone: string;
}

export type OrderWithCustomerDetails = OrderWithDetails & {
  customerDetails: CustomerDetails;
};
