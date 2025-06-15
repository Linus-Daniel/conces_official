import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import PrayerRequest from "@/models/PrayerRequest";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    console.log("Database connected successfully for PUT");

    const session = await getServerSession({
      req: request,
      ...authOptions
    });
    
    if (!session?.user) {
      console.warn("Unauthorized PUT attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prayerRequestId = params.id;
    const body = await request.json();
    console.log("Request body:", body);

    if (!body?.title || !body?.content) {
      console.warn("Missing fields in request:", body);
      return NextResponse.json(
        { error: "Missing required fields (title and content)" },
        { status: 400 }
      );
    }

    // Find the prayer request and verify ownership
    const existingRequest = await PrayerRequest.findById(prayerRequestId);
    if (!existingRequest) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    if (existingRequest.creator.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "You can only edit your own prayer requests" },
        { status: 403 }
      );
    }

    // Update the request
    const updatedRequest = await PrayerRequest.findByIdAndUpdate(
      prayerRequestId,
      {
        title: body.title,
        content: body.content,
        updatedAt: new Date(),
      },
      { new: true }
    );

    console.log("Prayer request updated:", updatedRequest);
    return NextResponse.json(updatedRequest, { status: 200 });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update prayer request" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    console.log("Database connected successfully for DELETE");

    const session = await getServerSession({
      req: request,
      ...authOptions
    });
    
    if (!session?.user) {
      console.warn("Unauthorized DELETE attempt");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const prayerRequestId = params.id;

    // Find the prayer request and verify ownership
    const existingRequest = await PrayerRequest.findById(prayerRequestId);
    if (!existingRequest) {
      return NextResponse.json(
        { error: "Prayer request not found" },
        { status: 404 }
      );
    }

    if (existingRequest.creator.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "You can only delete your own prayer requests" },
        { status: 403 }
      );
    }

    // Delete the request
    await PrayerRequest.findByIdAndDelete(prayerRequestId);

    console.log("Prayer request deleted:", prayerRequestId);
    return NextResponse.json(
      { message: "Prayer request deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json(
      { error: "Failed to delete prayer request" },
      { status: 500 }
    );
  }
}