// app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { hashPassword } from "@/lib/hash";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { z } from "zod";
import api from "@/lib/axiosInstance";

// Validation schemas
const baseUserSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email format").toLowerCase(),
  phone: z.string().optional(),
  branch: z.string().min(1, "Branch is required"),
  institution: z.string().optional(),
  role: z.enum(["student", "branch-admin", "admin", "alumni"]),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const adminUserSchema = baseUserSchema.extend({
  branch: z.string().min(1, "Branch is required for admin registration"),
});

function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

function isValidRole(role: string, isAdmin: boolean): boolean {
  const allowedRoles = ["student", "branch-admin", "alumni"];
  if (isAdmin) allowedRoles.push("admin");
  return allowedRoles.includes(role);
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role === "admin";

    const body = await req.json();
    const clientIP = req.headers.get("x-forwarded-for") || "unknown";

    if (isAdmin) {
      return handleAdminRegistration(body);
    }

    return handleUserRegistration(body, clientIP);
  } catch (error) {
    console.error("Registration route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleUserRegistration(body: any, clientIP: string) {
  try {
    // Validate input
    const validatedData = baseUserSchema.parse(body);
    const { fullName, email, phone, institution, role, branch, password } =
      validatedData;

    // Additional role validation
    if (!isValidRole(role, false)) {
      return NextResponse.json(
        { message: "Invalid role selected" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: sanitizeEmail(email) });
    if (existingUser) {
      if (existingUser.verified) {
        return NextResponse.json(
          { message: "Email is already registered and verified" },
          { status: 409 }
        );
      } else {
        // User exists but not verified, resend verification
        return await resendVerificationLink(existingUser);
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Create user with verified: false
    const newUser = new User({
      fullName: fullName.trim(),
      email: sanitizeEmail(email),
      phone: phone?.trim(),
      institution: institution?.trim(),
      role,
      branch,
      password: hashedPassword,
      verified: false,
      verificationToken,
      verificationExpires,
      createdAt: new Date(),
    });

    await newUser.save();

    // Send verification email
    await sendVerificationEmail(newUser, verificationToken);

    return NextResponse.json(
      {
        message:
          "Registration successful! Please check your email to verify your account.",
        requiresVerification: true,
        userId: newUser._id,
      },
      { status: 201 }
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

    console.error("User registration error:", error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Registration failed",
      },
      { status: 500 }
    );
  }
}

async function resendVerificationLink(user: any) {
  try {
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
        message: "A new verification link has been sent to your email.",
        requiresVerification: true,
        userId: user._id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Resend verification error:", error);
    return NextResponse.json(
      { message: "Failed to resend verification email" },
      { status: 500 }
    );
  }
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
                    Thank you for registering! To complete your account setup, please verify your email address by clicking the button below:
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

async function handleAdminRegistration(body: any) {
  try {
    // Validate admin registration data
    const validatedData = adminUserSchema.parse(body);
    const { fullName, email, phone, institution, role, password, branch } =
      validatedData;

    // Additional role validation for admin
    if (!isValidRole(role, true)) {
      return NextResponse.json(
        { message: "Invalid role selected" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email: sanitizeEmail(email) });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      fullName: fullName.trim(),
      email: sanitizeEmail(email),
      phone: phone?.trim(),
      institution: institution?.trim(),
      role,
      password: hashedPassword,
      branch: branch.trim(),
      verified: true, // Admin-created users are automatically verified
      createdAt: new Date(),
    });

    await newUser.save();

    return NextResponse.json(
      {
        message: "User registered successfully (admin bypass)",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
          branch: newUser.branch,
          verified: newUser.verified,
        },
      },
      { status: 201 }
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

    console.error("Admin registration error:", error);
    return NextResponse.json(
      { message: "Internal server error during admin registration" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST for registration." },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST for registration." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { message: "Method not allowed. Use POST for registration." },
    { status: 405 }
  );
}
