// app/api/events/[id]/route.ts (Note: should be 'events' not 'event')
import { NextResponse } from "next/server";
import Event from "@/models/Events";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import mongoose from "mongoose";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    console.log("🔍 Fetching event with ID:", id);
    console.log("🔍 ID type:", typeof id, "ID length:", id.length);

    // Debug: Try multiple ways to find the event
    let event = null;

    // Method 1: Try with custom 'id' field
    event = await Event.findOne({ id: id });
    console.log(
      "🔍 Method 1 (custom id field):",
      event ? "FOUND" : "NOT FOUND"
    );

    // Method 2: Try with MongoDB _id field (if it's a valid ObjectId)
    if (!event && mongoose.Types.ObjectId.isValid(id)) {
      event = await Event.findById(id);
      console.log("🔍 Method 2 (MongoDB _id):", event ? "FOUND" : "NOT FOUND");
    }

    // Method 3: Try with _id as string
    if (!event) {
      event = await Event.findOne({ _id: id });
      console.log(
        "🔍 Method 3 (_id as string):",
        event ? "FOUND" : "NOT FOUND"
      );
    }

    // Debug: Show all events and their ID formats
    const allEvents = await Event.find({}, { id: 1, _id: 1, title: 1 }).limit(
      5
    );
    console.log("🔍 Sample events in database:");
    allEvents.forEach((e) => {
      console.log("  - Title:", e.title);
      console.log("    Custom ID:", e.id, "(type:", typeof e.id, ")");
      console.log("    MongoDB _id:", e._id, "(type:", typeof e._id, ")");
      console.log("    ---");
    });

    if (!event) {
      return NextResponse.json(
        {
          message: `Event not found with ID: ${id}`,
          debug: {
            receivedId: id,
            idType: typeof id,
            idLength: id.length,
            isValidObjectId: mongoose.Types.ObjectId.isValid(id),
          },
        },
        { status: 404 }
      );
    }

    console.log("✅ Event found:", event.title);
    return NextResponse.json(event);
  } catch (error: any) {
    console.error("❌ Error fetching event:", error);
    return NextResponse.json(
      { message: "Error fetching event", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    console.log("🔍 Updating event with ID:", id);
    console.log("🔍 Update body:", body);

    // If this is an approval action and user is not admin, prevent it
    if (body.approved !== undefined && session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Only admins can approve events" },
        { status: 403 }
      );
    }

    // Try to find the event first (same logic as GET)
    let event = await Event.findOne({ id: id });
    if (!event && mongoose.Types.ObjectId.isValid(id)) {
      event = await Event.findById(id);
    }
    if (!event) {
      event = await Event.findOne({ _id: id });
    }

    if (!event) {
      console.log("❌ Event not found for update:", id);
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    console.log("✅ Event found for update:", event.title);

    // Check permissions for chapter-admin
    if (
      session.user.role === "chapter-admin" &&
      event.chapter !== session.user.chapter &&
      body.approved === undefined
    ) {
      return NextResponse.json(
        { error: "Forbidden: Not your event" },
        { status: 403 }
      );
    }

    // Update using the same method that found the event
    let updatedEvent;
    if (event.id === id) {
      updatedEvent = await Event.findOneAndUpdate({ id: id }, body, {
        new: true,
        runValidators: true,
      });
    } else {
      updatedEvent = await Event.findByIdAndUpdate(event._id, body, {
        new: true,
        runValidators: true,
      });
    }

    console.log("✅ Event updated successfully");
    return NextResponse.json(updatedEvent);
  } catch (error: any) {
    console.error("❌ PUT /events/[id] error:", error);
    return NextResponse.json(
      { message: "Error updating event", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();

    const { id } = await params;
    console.log("🔍 Deleting event with ID:", id);

    // Try to find the event first (same logic as GET)
    let event = await Event.findOne({ id: id });
    if (!event && mongoose.Types.ObjectId.isValid(id)) {
      event = await Event.findById(id);
    }
    if (!event) {
      event = await Event.findOne({ _id: id });
    }

    if (!event) {
      console.log("❌ Event not found for deletion:", id);
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    console.log("✅ Event found for deletion:", event.title);

    // Check permissions for chapter-admin
    if (
      session.user.role === "chapter-admin" &&
      event.chapter !== session.user.chapter
    ) {
      return NextResponse.json(
        { error: "Forbidden: Not your event" },
        { status: 403 }
      );
    }

    // Delete using the same method that found the event
    if (event.id === id) {
      await Event.findOneAndDelete({ id: id });
    } else {
      await Event.findByIdAndDelete(event._id);
    }

    console.log("✅ Event deleted successfully");
    return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error: any) {
    console.error("❌ DELETE /events/[id] error:", error);
    return NextResponse.json(
      { message: "Error deleting event", error: error.message },
      { status: 500 }
    );
  }
}
