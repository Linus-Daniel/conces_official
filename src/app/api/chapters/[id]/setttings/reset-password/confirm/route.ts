// /api/settings/reset-password/confirm/route.ts
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { token, newPassword } = await request.json();

    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 400 }
      );
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password and clear reset token
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      verificationToken: undefined,
      verificationExpires: undefined,
      updatedAt: new Date(),
    });

    return NextResponse.json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Password reset confirm error:", error);
    return NextResponse.json(
      { error: "Failed to reset password" },
      { status: 500 }
    );
  }
}
