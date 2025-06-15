import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resource from '@/models/Resources';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-hardcoded-dev-secret';

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const resources = await Resource.find({});
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();

  // 🔒 1. Get and verify token
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized - No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  let user;
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    user = decoded as { id: string; role: string; email: string };
  } catch (err) {
    return NextResponse.json({ error: 'Unauthorized - Invalid token' }, { status: 401 });
  }

  // 🔒 2. Role check
  const allowedRoles = ['admin', 'branch admin'];
  if (!allowedRoles.includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden - Insufficient role' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const { title, description, thumbnail, type, tags, author, date } = body;

    if (!title || !description || !thumbnail || !type || !author || !date) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newResource = await Resource.create({
      title,
      description,
      thumbnail,
      type,
      tags,
      author,
      date,
    });

    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}
