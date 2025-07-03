// app/api/testimonies/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';
import dbConnect from '@/lib/dbConnect';
import Testimony from '@/models/Testimony';

export async function GET() {
  await dbConnect();
  const testimonies = await Testimony.find().sort({ createdAt: -1 });
  return NextResponse.json(testimonies);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const data = await req.json();

  const newTestimony = await Testimony.create({
    ...data,
    user: session.user.id,
  });

  return NextResponse.json(newTestimony, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const { id, ...updateData } = await req.json();

  const testimony = await Testimony.findById(id);
  if (!testimony) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (testimony.user.toString() !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  Object.assign(testimony, updateData);
  await testimony.save();

  return NextResponse.json(testimony);
}

export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await dbConnect();
  const { id } = await req.json();

  const testimony = await Testimony.findById(id);
  if (!testimony) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (testimony.user.toString() !== session.user.id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  await Testimony.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
