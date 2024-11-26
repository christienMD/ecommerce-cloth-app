// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_SERVER_USERNAME,
        pass: process.env.SMTP_SERVER_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Test connection
    await transporter.verify();
    console.log("SMTP connection verified");

    // Send test email
    const info = await transporter.sendMail({
      from: `"Test Sender" <${process.env.SMTP_SERVER_USERNAME}>`,
      to: process.env.SITE_MAIL_RECEIVER,
      subject: "Test Email",
      text: "This is a test email to verify the configuration",
      html: "<b>This is a test email to verify the configuration</b>",
    });

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      messageId: info.messageId,
    });
  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json(
      {
        success: false,
        // error: error.message,
      },
      { status: 500 }
    );
  }
}
