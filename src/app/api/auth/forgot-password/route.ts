import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import crypto from "crypto";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format").toLowerCase(),
});

function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

async function sendPasswordResetEmail(user: any, resetToken: string) {
  try {
    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: user.email,
        subject: "Reset Your Password - CONCES",
        content: {
          type: "html",
          body: `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Password Reset</title>
              </head>
              <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
                  <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
                  <p style="color: #666; font-size: 16px;">Hello ${user.fullName},</p>
                  <p style="color: #666; font-size: 16px;">
                    You requested a password reset for your CONCES account. Click the button below to reset your password:
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" 
                       style="background-color: #dc3545; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-size: 16px; font-weight: bold;">
                      Reset Password
                    </a>
                  </div>
                  <p style="color: #666; font-size: 14px;">
                    <strong>Important:</strong> This password reset link will expire in 1 hour for security reasons.
                  </p>
                  <p style="color: #666; font-size: 14px;">
                    If the button doesn't work, you can copy and paste this link into your browser:
                  </p>
                  <p style="color: #007bff; font-size: 14px; word-break: break-all;">
                    ${resetUrl}
                  </p>
                  <p style="color: #666; font-size: 14px;">
                    If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
                  </p>
                  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
                  <p style="color: #999; font-size: 12px; text-align: center;">
                    This email was sent by CONCES. If you have any questions, please contact our support team.
                  </p>
                </div>
              </body>
            </html>
          `,
        },
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send password reset email");
    }

    return await response.json();
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const validatedData = forgotPasswordSchema.parse(body);
    const { email } = validatedData;

    // Find user by email
    const user = await User.findOne({ email: sanitizeEmail(email) });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json(
        {
          message: "If an account with this email exists, a password reset link has been sent.",
        },
        { status: 200 }
      );
    }

    // Check if user is verified
    if (!user.verified) {
      return NextResponse.json(
        {
          message: "Please verify your email address before resetting your password.",
          needsVerification: true,
        },
        { status: 400 }
      );
    }

    // Generate reset token
    const resetToken = generateResetToken();
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Update user with reset token
    user.passwordResetToken = resetToken;
    user.passwordResetExpires = resetExpires;
    await user.save();

    // Send password reset email
    await sendPasswordResetEmail(user, resetToken);

    return NextResponse.json(
      {
        message: "Password reset link has been sent to your email address.",
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

    console.error("Forgot password error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to process password reset request",
      },
      { status: 500 }
    );
  }
}