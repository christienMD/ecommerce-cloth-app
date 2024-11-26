// lib/email-service.ts
"use server";
import nodemailer from "nodemailer";
import { Prisma } from "@prisma/client";
import type { OrderWithDetails } from "@/app/types/orders";

const SMTP_SERVER_HOST = "smtp.gmail.com";
const SMTP_SERVER_USERNAME = process.env.SMTP_SERVER_USERNAME;
const SMTP_SERVER_PASSWORD = process.env.SMTP_SERVER_PASSWORD;
const SITE_MAIL_RECEIVER = process.env.SITE_MAIL_RECEIVER;

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: SMTP_SERVER_HOST,
  port: 587,
  secure: true,
  auth: {
    user: SMTP_SERVER_USERNAME,
    pass: SMTP_SERVER_PASSWORD,
  },
});

// Format currency in XAF
const formatCurrency = (amount: Prisma.Decimal | number): string => {
  const numberAmount =
    amount instanceof Prisma.Decimal ? parseFloat(amount.toString()) : amount;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "XAF",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberAmount);
};

export async function sendOrderNotification(order: OrderWithDetails) {
  try {
    console.log("Starting email send process...");

    // Verify transporter
    const isVerified = await transporter.verify();
    if (!isVerified) {
      throw new Error("Email configuration verification failed");
    }

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #1a365d; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">
            New Order Received! 🎉
          </h2>
          
          <!-- Customer Information Section -->
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin: 0 0 10px 0;">Customer Details:</h3>
            <p style="margin: 8px 0;"><strong>Name:</strong> ${
              order.user.firstName
            } ${order.user.lastName}</p>
            <p style="margin: 8px 0;"><strong>Phone (WhatsApp):</strong> ${
              order.user.phoneNumber || "Not provided"
            }</p>
            <p style="margin: 8px 0;"><strong>Email:</strong> ${
              order.user.email
            }</p>
          </div>

          <!-- Order Information Section -->
          <div style="background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="color: #2d3748; margin: 0 0 10px 0;">Order Details:</h3>
            <p style="margin: 8px 0;"><strong>Order ID:</strong> #${
              order.id
            }</p>
            <p style="margin: 8px 0;"><strong>Status:</strong> ${
              order.status
            }</p>
            <p style="margin: 8px 0;"><strong>Total Amount:</strong> ${formatCurrency(
              order.totalAmount
            )}</p>
            <p style="margin: 8px 0;"><strong>Date:</strong> ${new Date(
              order.createdAt
            ).toLocaleString("en-US", { timeZone: "Africa/Douala" })}</p>
          </div>

          <!-- Products Table -->
          <h3 style="color: #2d3748; margin-top: 20px;">Ordered Items:</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <thead>
              <tr style="background-color: #edf2f7;">
                <th style="padding: 12px; border: 1px solid #e2e8f0;">Product</th>
                <th style="padding: 12px; border: 1px solid #e2e8f0;">Quantity</th>
                <th style="padding: 12px; border: 1px solid #e2e8f0;">Size</th>
                <th style="padding: 12px; border: 1px solid #e2e8f0;">Unit Price</th>
                <th style="padding: 12px; border: 1px solid #e2e8f0;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items
                .map(
                  (item) => `
                <tr>
                  <td style="padding: 12px; border: 1px solid #e2e8f0;">${
                    item.product.name
                  }</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">${
                    item.quantity
                  }</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: center;">${
                    item.size || "N/A"
                  }</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right;">${formatCurrency(
                    item.price
                  )}</td>
                  <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right;">${formatCurrency(
                    Number(item.price) * item.quantity
                  )}</td>
                </tr>
              `
                )
                .join("")}
            </tbody>
            <tfoot>
              <tr style="background-color: #f8fafc;">
                <td colspan="4" style="padding: 12px; border: 1px solid #e2e8f0; text-align: right;"><strong>Grand Total:</strong></td>
                <td style="padding: 12px; border: 1px solid #e2e8f0; text-align: right;"><strong>${formatCurrency(
                  order.totalAmount
                )}</strong></td>
              </tr>
            </tfoot>
          </table>

          <!-- Quick Action Section -->
          <div style="margin-top: 20px; background-color: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center;">
            <h3 style="color: #2d3748; margin: 0 0 10px 0;">Quick Actions</h3>
            <p style="margin: 5px 0;">
              <strong>📱 Contact Customer:</strong><br>
              WhatsApp/Call: ${order.user.phoneNumber || "Not provided"}<br>
              Email: ${order.user.email}
            </p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; text-align: center;">
            <p style="color: #718096; font-size: 0.875rem;">
              This is an automated notification. Please do not reply to this email.
            </p>
            <p style="color: #718096; font-size: 0.875rem; margin-top: 8px;">
              <strong>Store Location:</strong> Douala, Cameroon<br>
              <strong>Contact:</strong> For support, please contact us through the website
            </p>
          </div>
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME,
      to: SITE_MAIL_RECEIVER,
      subject: `New Order #${order.id} Received`,
      html: htmlContent,
    });

    console.log("Email notification sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Failed to send order notification:", error);
    throw error;
  }
}

// Test email function
export async function testEmailService() {
  try {
    // Verify configuration
    const isVerified = await transporter.verify();
    if (!isVerified) {
      throw new Error("Email configuration verification failed");
    }

    const info = await transporter.sendMail({
      from: SMTP_SERVER_USERNAME,
      to: SITE_MAIL_RECEIVER,
      subject: "Test Email Service",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #2d3748;">Test Email</h2>
          <p>If you receive this email, your email service is working correctly!</p>
          <p>Test Date: ${new Date().toLocaleString("en-US", {
            timeZone: "Africa/Douala",
          })}</p>
        </div>
      `,
    });

    console.log("Test email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error("Test email failed:", error);
    throw error;
  }
}
