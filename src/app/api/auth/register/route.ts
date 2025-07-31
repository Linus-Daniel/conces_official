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

// Use Redis or database for production instead of in-memory Map
const verificationCodes = new Map<
  string,
  {
    email: string;
    code: string;
    expiresAt: number;
    attempts: number;
  }
>();

// Validation schemas
const baseUserSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email format").toLowerCase(),
  phone: z.string().optional(),
  branch:z.string().min(1, "Branch is required"),
  institution: z.string().optional(),
  role: z.enum(["student", "branch-admin", "admin", "alumni"]),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const adminUserSchema = baseUserSchema.extend({
  branch: z.string().min(1, "Branch is required for admin registration"),
});

const verificationSchema = z.object({
  verificationCode: z.string().length(6, "Verification code must be 6 digits"),
  verificationId: z.string().uuid("Invalid verification ID"),
});

function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
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
    const { verificationCode, verificationId } = body;

    const clientIP = req.headers.get("x-forwarded-for") || "unknown";

    if (isAdmin) {
      return handleAdminRegistration(body);
    }

    if (verificationCode && verificationId) {
      return handleVerification({
        verificationCode,
        verificationId,
        userData: body,
      });
    }

    return handleInitialRegistration(body, clientIP);
  } catch (error) {
    console.error("Registration route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleInitialRegistration(body: any, clientIP: string) {
  try {
    // Validate input
    const validatedData = baseUserSchema.parse(body);
    const { fullName, email, phone, institution, role,branch, password } =
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
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 }
      );
    }

    // Clean up expired verification codes
    cleanupExpiredCodes();

    const verificationId = crypto.randomUUID();
    const code = generateVerificationCode();

    verificationCodes.set(verificationId, {
      email: sanitizeEmail(email),
      code,
      expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes
      attempts: 0,
    });

async function sendVerificationEmail() {
  try {
    const emailResponse = await api.post(
      `${process.env.NEXTAUTH_URL}/api/send-email`,
      {
        to: email,
        subject: "Email Verification - Your Account Registration",
        content: {
          type: "html",
          body: `
           " <!DOCTYPE html>
            <html>
              <head>
                <meta charset="utf-8">
                <title>Email Verification</title>
              </head>
              <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background-color: #f8f9fa; padding: 30px; border-radius: 10px;">
                  <h2 style="color: #333; text-align: center;">Email Verification</h2>
                  <p style="color: #666; font-size: 16px;">Hello ${fullName},</p>
                  <p style="color: #666; font-size: 16px;">Please use the following verification code to complete your registration:</p>
                  <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
                    <h1 style="margin: 0; font-size: 32px; letter-spacing: 5px;">${code}</h1>
                  </div>
                  <p style="color: #666; font-size: 14px;">
                    <strong>Important:</strong> This code will expire in 15 minutes for security reasons.
                  </p>
                  <p style="color: #666; font-size: 14px;">
                    If you didn't request this verification, please ignore this email.
                  </p>
                </div>
              </body>
            </html>"
          `,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json", // Explicitly request JSON response
        },
      }
    );
    return emailResponse.data;
  } catch (error: any) {
    console.error(
      "Error sending verification email:",
      error.response?.data || error.message
    );
    throw new Error("Failed to send verification email");
  }
}

  const emailResponse = await sendVerificationEmail().catch((error) => {
    verificationCodes.delete(verificationId); // Clean up on email failure
    throw error;
  });

    if (!emailResponse) {
      const errorData = await emailResponse;

      console.error("Email API error:", errorData);
      verificationCodes.delete(verificationId); // Clean up on email failure
      throw new Error("Failed to send verification email");
    }

    return NextResponse.json(
      {
        message: "Verification code sent to your email",
        requiresVerification: true,
        verificationId,
        expiresAt: Date.now() + 15 * 60 * 1000,
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

    console.error("Initial registration error:", error);
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to send verification code",
      },
      { status: 500 }
    );
  }
}

async function handleVerification(params: {
  verificationCode: string;
  verificationId: string;
  userData: any;
}) {
  try {
    const { verificationCode, verificationId, userData } = params;

    // Validate verification data
    const verificationData = verificationSchema.parse({
      verificationCode,
      verificationId,
    });
    const validatedUserData = baseUserSchema.parse(userData);

    const { fullName, email, phone,branch, institution, role, password } =
      validatedUserData;

    const verification = verificationCodes.get(verificationId);

    if (!verification) {
      return NextResponse.json(
        { message: "Invalid or expired verification request" },
        { status: 400 }
      );
    }

    // Check expiration
    if (Date.now() > verification.expiresAt) {
      verificationCodes.delete(verificationId);
      return NextResponse.json(
        { message: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Check attempt limit
    if (verification.attempts >= 3) {
      verificationCodes.delete(verificationId);
      return NextResponse.json(
        {
          message: "Too many verification attempts. Please request a new code.",
        },
        { status: 429 }
      );
    }

    // Verify code and email
    if (
      verification.email !== sanitizeEmail(email) ||
      verification.code !== verificationCode
    ) {
      verification.attempts += 1;
      verificationCodes.set(verificationId, verification);

      return NextResponse.json(
        {
          message: "Invalid verification code or email mismatch",
          attemptsRemaining: 3 - verification.attempts,
        },
        { status: 400 }
      );
    }

    // Check if user was created while verification was pending
    const existingUser = await User.findOne({ email: sanitizeEmail(email) });
    if (existingUser) {
      verificationCodes.delete(verificationId);
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 409 }
      );
    }

    // Create user
    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      fullName: fullName.trim(),
      email: sanitizeEmail(email),
      phone: phone?.trim(),
      institution: institution?.trim(),
      role,
      branch,
      password: hashedPassword,
      emailVerified: true,
      createdAt: new Date(),
    });

    await newUser.save();
    verificationCodes.delete(verificationId);

    return NextResponse.json(
      {
        message: "Registration completed successfully!",
        user: {
          id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
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

    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Internal server error during verification" },
      { status: 500 }
    );
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
      emailVerified: true,
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

// Utility function to clean up expired verification codes
function cleanupExpiredCodes() {
  const now = Date.now();
  for (const [id, verification] of verificationCodes.entries()) {
    if (now > verification.expiresAt) {
      verificationCodes.delete(id);
    }
  }
}

// Handle unsupported methods
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
