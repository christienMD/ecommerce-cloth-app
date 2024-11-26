// services/fapshi.ts

import axios from 'axios';
import { FapshiPaymentRequest, FapshiPaymentResponse, PaymentStatus } from '../types/payment';

class FapshiPaymentService {
  private readonly baseUrl: string;
  private readonly apiUser: string;
  private readonly apiKey: string;

  constructor() {
    // We'll use environment variables for these
    this.baseUrl = process.env.NEXT_PUBLIC_FAPSHI_BASE_URL || 'https://sandbox.fapshi.com';
    this.apiUser = process.env.FAPSHI_API_USER || '';
    this.apiKey = process.env.FAPSHI_API_KEY || '';
  }

  private get headers() {
    return {
      'Content-Type': 'application/json',
      'apiuser': this.apiUser,
      'apikey': this.apiKey,
    };
  }

  async initiatePayment(paymentData: FapshiPaymentRequest): Promise<FapshiPaymentResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/initiate-pay`,
        paymentData,
        { headers: this.headers }
      );

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Fapshi payment initiation failed:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Payment initiation failed');
    }
  }

  async getPaymentStatus(transId: string): Promise<PaymentStatus> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/payment-status/${transId}`,
        { headers: this.headers }
      );

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Failed to get payment status:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to get payment status');
    }
  }

  async expirePayment(transId: string): Promise<PaymentStatus> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/expire-pay`,
        { transId },
        { headers: this.headers }
      );

      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Failed to expire payment:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Failed to expire payment');
    }
  }
}

export const fapshiService = new FapshiPaymentService();