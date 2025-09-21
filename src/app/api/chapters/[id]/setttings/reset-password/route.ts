// /api/settings/reset-password/route.ts
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import api from "@/lib/axiosInstance";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Don't reveal if user exists or not for security
      return NextResponse.json({
        message:
          "If an account with that email exists, a password reset link has been sent.",
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // Save reset token to user
    await User.findByIdAndUpdate(user._id, {
      verificationToken: resetToken,
      verificationExpires: resetTokenExpiry,
    });

    // Create reset URL
    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    // Send email (you'll need to implement sendEmail function)
    const emailData = {
      to: user.email,
      subject: "Password Reset Request",
      content: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your account.</p>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };
    


    await api.post("/send-email",{emailData})
    return NextResponse.json({
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json(
      { error: "Failed to send password reset email" },
      { status: 500 }
    );
  }
}
