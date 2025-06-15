import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Resource from '@/models/Resources';
import mongoose from 'mongoose';
import { getServerSession } from "next-auth/next";  // or your auth method
import { authOptions } from '../../auth/[...nextauth]/route';

async function getUserFromSession(req: NextRequest) {
  const session = await getServerSession( authOptions);
  if (!session || !session.user) return null;
  return session.user; // assume it contains { id, role }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid resource ID' }, { status: 400 });
  }

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }
    return NextResponse.json(resource, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resource' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const user = await getUserFromSession(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid resource ID' }, { status: 400 });
  }

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Branch admin can only update their own resource
    if (user.role === 'branch_admin' && resource.createdBy.toString() !== user.id) {
      return NextResponse.json({ error: 'Forbidden: Not your resource' }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, thumbnail, type, tags, author, date } = body;

    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { title, description, thumbnail, type, tags, author, date },
      { new: true, runValidators: true }
    );

    return NextResponse.json(updatedResource, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  const user = await getUserFromSession(req);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: 'Invalid resource ID' }, { status: 400 });
  }

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }

    // Branch admin can only delete their own resource
    if (user.role === 'branch_admin' && resource.createdBy.toString() !== user.id) {
      return NextResponse.json({ error: 'Forbidden: Not your resource' }, { status: 403 });
    }

    await Resource.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Resource deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete resource' }, { status: 500 });
  }
}
