// app/api/verify-email/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { z } from "zod";

const verificationSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { message: "Verification token is required" },
        { status: 400 }
      );
    }

    // Validate token format
    const validatedData = verificationSchema.parse({ token });

    // Find user with this verification token
    const user = await User.findOne({
      verificationToken: validatedData.token,
      verificationExpires: { $gt: new Date() }, // Token not expired
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or expired verification token",
          expired: true,
        },
        { status: 400 }
      );
    }

    // Check if user is already verified
    if (user.verified) {
      return NextResponse.json(
        {
          message: "Email is already verified",
          alreadyVerified: true,
        },
        { status: 200 }
      );
    }

    // Verify the user
    user.verified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully! You can now log in.",
        verified: true,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Invalid verification token format",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Email verification error:", error);
    return NextResponse.json(
      { message: "Internal server error during verification" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { message: "Verification token is required" },
        { status: 400 }
      );
    }

    // Validate token format
    const validatedData = verificationSchema.parse({ token });

    // Find user with this verification token
    const user = await User.findOne({
      verificationToken: validatedData.token,
      verificationExpires: { $gt: new Date() }, // Token not expired
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid or expired verification token",
          expired: true,
        },
        { status: 400 }
      );
    }

    // Check if user is already verified
    if (user.verified) {
      return NextResponse.json(
        {
          message: "Email is already verified",
          alreadyVerified: true,
        },
        { status: 200 }
      );
    }

    // Verify the user
    user.verified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;
    await user.save();

    return NextResponse.json(
      {
        message: "Email verified successfully! You can now log in.",
        verified: true,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Invalid verification token format",
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error("Email verification error:", error);
    return NextResponse.json(
      { message: "Internal server error during verification" },
      { status: 500 }
    );
  }
}

export async function PUT() {
  return NextResponse.json(
    { message: "Method not allowed. Use GET or POST for verification." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Method not allowed. Use GET or POST for verification." },
    { status: 405 }
  );
}
