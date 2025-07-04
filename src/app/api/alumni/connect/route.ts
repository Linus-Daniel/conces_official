import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Connection from '@/models/Connect';
import User from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { authOptions } from '@/lib/next-auth';

export async function GET() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'alumni') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const connections = await Connection.find({
      $or: [
        { alumniId: session.user.id },
        { connectedUserId: session.user.id }
      ],
      status: 'connected'
    }).populate('alumniId connectedUserId', 'fullName avatar currentRole');

    return NextResponse.json(connections);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch connections' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const { connectedUserId } = await request.json();

  if (!session || session.user.role !== 'alumni') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if connection already exists
    const existingConnection = await Connection.findOne({
      alumniId: session.user.id,
      connectedUserId
    });

    if (existingConnection) {
      return NextResponse.json(
        { error: 'Connection already exists' },
        { status: 400 }
      );
    }

    const newConnection = new Connection({
      alumniId: session.user.id,
      connectedUserId,
      status: 'pending'
    });

    await newConnection.save();

    return NextResponse.json(newConnection);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create connection' },
      { status: 500 }
    );
  }
}