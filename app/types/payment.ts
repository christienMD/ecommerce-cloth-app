// app/types/payment.ts
import { Decimal } from "@prisma/client/runtime/library";

export interface FapshiPaymentRequest {
  amount: number;
  email?: string;
  phone?: string; // Add phone
  redirectUrl?: string;
  userId?: string;
  externalId?: string;
  message?: string;
}

export interface FapshiPaymentResponse {
  link: string;
  transId: string;
}

export interface PaymentStatus {
  transId: string;
  status: "CREATED" | "PENDING" | "SUCCESSFUL" | "FAILED" | "EXPIRED";
  medium?: string;
  serviceName?: string;
  transType?: string;
  amount: number;
  revenue?: number;
  payerName?: string;
  email: string;
  phone?: string; // Add phone
  redirectUrl?: string;
  externalId?: string;
  userId?: string | null;
  webhook?: string;
  financialTransId?: string;
  dateInitiated: string;
  dateConfirmed?: string;
  message?: string;
}

export interface CartItem {
  variantId: number;
  quantity: number;
  price: number | Decimal;
}

export interface CartData {
  email: string;
  phone: string; // Add required phone
  cartItems: CartItem[];
}

export type PaymentMethod = "mobile money" | "orange money" | "card";

// import { Decimal } from "@prisma/client/runtime/library";
// // types/payment.ts

// export interface FapshiPaymentRequest {
//   amount: number;
//   email?: string;
//   redirectUrl?: string;
//   userId?: string;
//   externalId?: string;
//   message?: string;
// }

// export interface FapshiPaymentResponse {
//   link: string;
//   transId: string;
// }

// export interface PaymentStatus {
//   transId: string;
//   status: 'CREATED' | 'PENDING' | 'SUCCESSFUL' | 'FAILED' | 'EXPIRED';
//   medium?: string;
//   serviceName?: string;
//   transType?: string;
//   amount: number;
//   revenue?: number;
//   payerName?: string;
//   email: string;
//   redirectUrl?: string;
//   externalId?: string;
//   userId?: string | null;
//   webhook?: string;
//   financialTransId?: string;
//   dateInitiated: string;
//   dateConfirmed?: string;
//   message?: string;
// }

// export interface CartItem {
//   variantId: number;
//   quantity: number;
//   price: number | Decimal;
// }

// export interface CartData {
//   email: string;
//   cartItems: CartItem[];
// }

// export type PaymentMethod = "mobile money" | "orange money" | "card";
