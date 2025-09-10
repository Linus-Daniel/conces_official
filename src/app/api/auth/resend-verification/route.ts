// app/api/resend-verification/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import crypto from "crypto";
import { z } from "zod";
import api from "@/lib/axiosInstance";

const resendSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase(),
});

function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

async function sendVerificationEmail(user: any, verificationToken: string) {
  try {
    const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${verificationToken}`;

    const emailResponse = await api.post(
      `${process.env.NEXTAUTH_URL}/api/send-email`,
      {
        to: user.email,
        subject: "Verify Your Email Address - Complete Registration",
        content: {
          type: "html",
          body: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Email Verification</title>
              </head>
              <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
                  <h2 style="color: #333; text-align: center;">Email Verification</h2>
                  <p style="color: #666; font-size: 16px;">Hello ${user.fullName},</p>
                  <p style="color: #666; font-size: 16px;">
                    You requested a new verification link. To complete your account setup, please verify your email address by clicking the button below:
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationUrl}" 
                       style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px; font-weight: bold;">
                      Verify Email Address
                    </a>
                  </div>
                  <p style="color: #666; font-size: 14px;">
                    <strong>Important:</strong> This verification link will expire in 24 hours for security reasons.
                  </p>
                  <p style="color: #666; font-size: 14px;">
                    If the button doesn't work, you can copy and paste this link into your browser:
                  </p>
                  <p style="color: #007bff; font-size: 14px; word-break: break-all;">
                    ${verificationUrl}
                  </p>
                  <p style="color: #666; font-size: 14px;">
                    If you didn't request this verification, please ignore this email.
                  </p>
                </div>
              </body>
            </html>
          `,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (!emailResponse.data) {
      throw new Error("Failed to send verification email");
    }

    return emailResponse.data;
  } catch (error: any) {
    console.error(
      "Error sending verification email:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send verification email");
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();

    // Validate input
    const validatedData = resendSchema.parse(body);
    const { email } = validatedData;

    // Find user by email
    const user = await User.findOne({ email: sanitizeEmail(email) });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        {
          message:
            "If an account with this email exists, a verification link has been sent.",
        },
        { status: 200 }
      );
    }

    // Check if user is already verified
    if (user.verified) {
      return NextResponse.json(
        { message: "This email is already verified. You can log in now." },
        { status: 200 }
      );
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with new token
    user.verificationToken = verificationToken;
    user.verificationExpires = verificationExpires;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user, verificationToken);

    return NextResponse.json(
      {
        message: "A new verification link has been sent to your email address.",
        sent: true,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Validation error",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Resend verification error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to resend verification email",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST to resend verification." },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST to resend verification." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST to resend verification." },
    { status: 405 }
  );
}
