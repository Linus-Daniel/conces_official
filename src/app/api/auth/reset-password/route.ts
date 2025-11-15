import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/lib/hash";
import { z } from "zod";

const resetPasswordSchema = z.object({
  token: z.string().min(1, "Reset token is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const validatedData = resetPasswordSchema.parse(body);
    const { token, password } = validatedData;

    // Find user with this reset token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() }, // Token not expired
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or expired password reset token",
          expired: true,
        },
        { status: 400 }
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

    // Hash the new password
    const hashedPassword = await hashPassword(password);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    user.updatedAt = new Date();
    await user.save();

    return NextResponse.json(
      {
        message: "Password has been reset successfully. You can now log in with your new password.",
        success: true,
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

    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        message: "Failed to reset password. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Reset token is required" },
        { status: 400 }
      );
    }

    // Validate token
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetExpires: { $gt: new Date() }, // Token not expired
    }).select("_id fullName email");

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or expired password reset token",
          expired: true,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Valid reset token",
        valid: true,
        user: {
          fullName: user.fullName,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Validate reset token error:", error);
    return NextResponse.json(
      { message: "Failed to validate reset token" },
      { status: 500 }
    );
  }
}