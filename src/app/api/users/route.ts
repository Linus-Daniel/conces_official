// app/api/users/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

export async function GET(res:NextResponse) {
  try {
    await dbConnect();
    const users = await User.find({}).lean();
    return NextResponse.json({ status: 200, message: 'success', users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
