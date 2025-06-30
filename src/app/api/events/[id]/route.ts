import { NextResponse } from 'next/server';
import Events from '@/models/Events';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    // Await the params since it's now a Promise
    const { id } = await params;
    
    const event = await Events.findOne({ id });
    if (!event) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching event', error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  
  if (!session || !['admin', 'branch-admin'].includes(session.user.role)) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    
    // Await the params since it's now a Promise
    const { id } = await params;
    
    const body = await request.json();
    const updatedEvent = await Events.findOneAndUpdate(
      { id },
      body,
      { new: true }
    );
    
    if (!updatedEvent) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating event', error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  
  if (!session || !['admin', 'branch-admin'].includes(session.user.role)) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    
    // Await the params since it's now a Promise
    const { id } = await params;
    
    const deletedEvent = await Events.findOneAndDelete({ id });
    
    if (!deletedEvent) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error deleting event', error },
      { status: 500 }
    );
  }
}