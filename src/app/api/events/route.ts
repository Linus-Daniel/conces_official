import { NextRequest, NextResponse } from "next/server";
import Event from "@/models/Events";
import dbConnect from "@/lib/dbConnect";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import Chapter from "@/models/Chapter";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);

  try {
    const B = await Chapter.find();

    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  try {
    if (user?.role == "admin") {
      console.log("Admin user detected, fetching all events");
      const events = await Event.find()
        .sort({ date: 1 })
        .populate("chapter", "name");
      return NextResponse.json(events);
    }
    // Only return approved events for public view
    const events = await Event.find({ approved: true }).sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  const session = await getServerSession(authOptions);

  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
    console.log("Received data:", body);

    if (!body.eventData) {
      return NextResponse.json(
        { error: "Missing eventData in request body" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Invalid JSON in request body:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    // Generate a new ObjectId manually
    const newId = new Types.ObjectId();

    // Set approval based on user role
    const approved = session.user.role === "admin" ? true : false;

    const event = new Event({
      id: newId, // set the id explicitly
      ...body.eventData,
      approved, // Add approval field
      chapter: session.user.chapter, // Set chapter from user session
    });

    const savedEvent = await event.save();
    console.log("Event created:", savedEvent);

    return NextResponse.json(savedEvent, { status: 201 });
  } catch (error: any) {
    console.error("Failed to create event:", error);

    const errorMessage = error?.message || "Failed to create event";
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
