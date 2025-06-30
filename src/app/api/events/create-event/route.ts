import { NextResponse } from 'next/server';
import Events from '@/models/Events';
import dbConnect from '@/lib/dbConnect';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  
  // Check if user is admin or branch-admin
  if (!session || !['admin', 'branch-admin'].includes(session.user.role)) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    await dbConnect();
    
  const data = await request.json();
    
    
    // Generate a unique ID for the event
    const id = `event-${Date.now()}`;
    
    // Create new event
    const newEvent = new Events(data);

    
    await newEvent.save();
    
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error creating event', error },
      { status: 500 }
    );
  }
}