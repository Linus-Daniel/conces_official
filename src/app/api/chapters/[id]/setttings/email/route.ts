// /api/settings/email/route.ts - Update email with verification
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import api from "@/lib/axiosInstance";
export async function PUT(request: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { newEmail, password } = await request.json();

    if (!newEmail || !password) {
      return NextResponse.json(
        { error: "New email and password are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({
      email: newEmail.toLowerCase(),
      _id: { $ne: user._id },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 }
      );
    }

    // Generate verification token for new email
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(Date.now() + 3600000); // 1 hour

    // Store pending email change
    await User.findByIdAndUpdate(user._id, {
      verificationToken,
      verificationExpires: verificationExpiry,
      // Store new email temporarily in a custom field or handle differently
    });

    // Send verification email to new address
    const verificationUrl = `${
      process.env.NEXTAUTH_URL
    }/verify-email-change?token=${verificationToken}&email=${encodeURIComponent(
      newEmail
    )}`;

    const emailData = {
      to: newEmail,
      subject: "Verify Email Change",
    content: `
        <h2>Verify Email Change</h2>
        <p>You requested to change your email address.</p>
        <p>Click the link below to confirm this change:</p>
        <a href="${verificationUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email Change</a>
        <p>This link will expire in 1 hour.</p>
      `,
    };

    await api.post("/send-email", {emailData})

    return NextResponse.json({
      message: "Verification email sent to new address",
    });
  } catch (error) {
    console.error("Email update error:", error);
    return NextResponse.json(
      { error: "Failed to update email" },
      { status: 500 }
    );
  }
}
