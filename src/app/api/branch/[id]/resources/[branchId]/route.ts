import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resource from '@/models/Resources';

export async function GET(req: NextRequest, { params }: { params: Promise<{ branchId: string }> }) {
  await dbConnect();
  const { branchId } = await params;

  try {
    const resources = await Resource.find({ branch: branchId }).sort({ createdAt: -1 }).lean();
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch branch resources:', error);
    return NextResponse.json({ message: 'Error fetching branch resources' }, { status: 500 });
  }
}
