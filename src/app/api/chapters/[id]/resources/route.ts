import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resource from '@/models/Resources';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await params;

  console.log("The branch ID: is",id)

  try {
    const resources = await Resource.find({ branch: id }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(resources, { status: 201 });
  } catch (error) {
    console.error('Failed to fetch branch resources:', error);
    return NextResponse.json({ message: 'Error fetching branch resources' }, { status: 500 });
  }
}
