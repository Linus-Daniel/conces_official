import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Input all necessary fields' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Assuming comparePassword is an instance method on the User schema
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Return only safe user data
    return NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          name: user.fullName,
          role: user.role,
          institution: user.institution,
          phone: user.phone,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed, use POST' }, { status: 405 });
}
