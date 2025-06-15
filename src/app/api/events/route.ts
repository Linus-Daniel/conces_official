// app/api/events/route.ts
import { NextResponse } from 'next/server';
import Event from '@/models/Events';
import dbConnect from '@/lib/dbConnect';
import { Types } from 'mongoose';

export async function GET() {
  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }

  try {
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    await dbConnect();
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
    console.log('Received data:', body);

    if (!body.eventData) {
      return NextResponse.json({ error: 'Missing eventData in request body' }, { status: 400 });
    }
  } catch (error) {
    console.error('Invalid JSON in request body:', error);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  try {
    // generate a new ObjectId manually
    const newId = new Types.ObjectId();
    
    const event = new Event({
      id: newId, // set the id explicitly
      ...body.eventData,
    });

    const savedEvent = await event.save();
    console.log('Event created:', savedEvent);

    return NextResponse.json(savedEvent, { status: 201 });
  } catch (error: any) {
    console.error('Failed to create event:', error);

    const errorMessage = error?.message || 'Failed to create event';
    const validationErrors = error?.errors
      ? Object.values(error.errors).map((e: any) => e.message)
      : null;

    return NextResponse.json(
      {
        error: errorMessage,
        ...(validationErrors && { validationErrors }),
      },
      { status: 400 }
    );
  }
}