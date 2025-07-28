// app/api/send-email/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";

// Define Zod schema for request validation
const emailRequestSchema = z.object({
  to: z.union([z.string().email(), z.array(z.string().email())]),
  subject: z.string().min(1, "Subject is required"),
  content: z.object({
    type: z.enum(["text", "html"]),
    body: z.string().min(1, "Email body is required"),
  }),
  from: z.string().email().optional(),
});

type EmailRequest = z.infer<typeof emailRequestSchema>;

export async function POST(request: Request) {
  console.log("[DEBUG] Incoming email request received");

  try {
    // Parse and validate request body
    const requestBody = await request.json();
    console.log("[DEBUG] Parsed request body:", requestBody);

    const validationResult = emailRequestSchema.safeParse(requestBody);

    if (!validationResult.success) {
      console.error(
        "[ERROR] Validation failed:",
        validationResult.error.errors
      );
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors: validationResult.error.errors,
        },
        { status: 400 }
      );
    }

    const { to, subject, content, from } = validationResult.data;
    console.log("[DEBUG] Validated email data:", {
      to,
      subject,
      content,
      from,
    });

    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error(
        "[ERROR] Missing EMAIL_USER or EMAIL_PASSWORD in environment"
      );
      return NextResponse.json(
        {
          success: false,
          message: "Email service not configured properly",
        },
        { status: 500 }
      );
    }

    // Setup nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    console.log("[DEBUG] Nodemailer transporter configured");

    // Prepare email options
    const mailOptions = {
      from: from || `"Your App" <${process.env.EMAIL_USER}>`,
      to: Array.isArray(to) ? to.join(", ") : to,
      subject,
      ...(content.type === "html"
        ? { html: content.body }
        : { text: content.body }),
    };

    console.log("[DEBUG] Mail options prepared:", mailOptions);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("[DEBUG] Email sent:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Email sent successfully",
        data: {
          messageId: info.messageId,
          accepted: info.accepted,
          rejected: info.rejected,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("[ERROR] Email API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error sending email",
        ...(process.env.NODE_ENV === "development"
          ? { error: error.message, stack: error.stack }
          : {}),
      },
      { status: 500 }
    );
  }
}
