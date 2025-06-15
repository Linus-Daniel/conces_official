// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { hashPassword } from '@/lib/hash';
import crypto from 'crypto';

const verificationCodes = new Map<string, { email: string; code: string; expiresAt: number }>();

function generateVerificationCode(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();
  const { verificationCode, verificationId } = body;

  if (verificationCode && verificationId) {
    return handleVerification({ verificationCode, verificationId, userData: body });
  }

  return handleInitialRegistration(body);
}

async function handleInitialRegistration(body: any) {
  const { fullName, email, phone, institution, role, password } = body;

  // Basic validation
  if (!fullName || !email || !password || !role) {
    return NextResponse.json(
      { message: 'Please fill all required fields' },
      { status: 400 }
    );
  }

  if (!['student', 'branch-admin', 'admin'].includes(role)) {
    return NextResponse.json(
      { message: 'Invalid role selected' },
      { status: 400 }
    );
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email is already registered' },
        { status: 409 }
      );
    }

    const verificationId = crypto.randomUUID();
    const code = generateVerificationCode();

    verificationCodes.set(verificationId, {
      email,
      code,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });

    const emailResponse = await fetch(`${process.env.NEXTAUTH_URL}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        subject: 'Your Verification Code',
        content: {
          type: 'html',
          body: `
            <h2>Email Verification</h2>
            <p>Your verification code is: <strong>${code}</strong></p>
            <p>This code will expire in 15 minutes.</p>
          `,
        },
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json();
      console.error('Email API error:', errorData);
      throw new Error('Failed to send verification email');
    }

    return NextResponse.json(
      {
        message: 'Verification code sent to your email',
        requiresVerification: true,
        verificationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : 'Failed to send verification code',
        details: process.env.NODE_ENV === 'development' ? error : undefined,
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
  const { verificationCode, verificationId, userData } = params;
  const { fullName, email, phone, institution, role, password } = userData;

  try {
    const verification = verificationCodes.get(verificationId);

    if (!verification) {
      return NextResponse.json(
        { message: 'Invalid verification request' },
        { status: 400 }
      );
    }

    if (Date.now() > verification.expiresAt) {
      verificationCodes.delete(verificationId);
      return NextResponse.json(
        { message: 'Verification code has expired' },
        { status: 400 }
      );
    }

    if (verification.email !== email || verification.code !== verificationCode) {
      return NextResponse.json(
        {
          message: `Invalid verification code or email mismatch`,
          debug: process.env.NODE_ENV === 'development' ? {
            expectedEmail: verification.email,
            expectedCode: verification.code,
            receivedEmail: email,
            receivedCode: verificationCode,
          } : undefined
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      fullName,
      email,
      phone,
      institution,
      role,
      password: hashedPassword,
      emailVerified: true,
    });

    await newUser.save();
    verificationCodes.delete(verificationId);

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Method not allowed, use POST' },
    { status: 405 }
  );
}
