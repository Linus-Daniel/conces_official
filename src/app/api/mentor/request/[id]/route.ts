import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import MentorRequest from "@/models/MentorRequest";
import User from "@/models/User";
import AlumniProfile from "@/models/Alumni";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !["admin", "chapter-admin", "alumni"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const mentorRequest = await MentorRequest.findById(id)
      .populate({
        path: "alumniId",
        populate: {
          path: "userId",
          select: "fullName email avatar"
        }
      })
      .populate("reviewedBy", "fullName");

    if (!mentorRequest) {
      return NextResponse.json({ error: "Mentor request not found" }, { status: 404 });
    }

    // Alumni can only view their own requests
    if (session.user.role === "alumni") {
      const alumniProfile = await AlumniProfile.findOne({ userId: session.user.id });
      if (!alumniProfile || mentorRequest.alumniId._id.toString() !== alumniProfile._id.toString()) {
        return NextResponse.json({ error: "Access denied" }, { status: 403 });
      }
    }

    return NextResponse.json({ request: mentorRequest });
  } catch (error) {
    console.error("Error fetching mentor request:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentor request" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { status, adminNotes } = body;

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Must be 'approved' or 'rejected'" },
        { status: 400 }
      );
    }

    const mentorRequest = await MentorRequest.findById(id);

    if (!mentorRequest) {
      return NextResponse.json({ error: "Mentor request not found" }, { status: 404 });
    }

    if (mentorRequest.status !== "pending") {
      return NextResponse.json(
        { error: "Request has already been processed" },
        { status: 400 }
      );
    }

    // Update the mentor request status
    const updatedRequest = await MentorRequest.findByIdAndUpdate(
      id,
      {
        status,
        adminNotes,
        reviewedAt: new Date(),
        reviewedBy: session.user.id,
      },
      { new: true }
    ).populate({
      path: "alumniId",
      populate: {
        path: "userId",
        select: "fullName email avatar"
      }
    });

    // If approved, update the alumni profile to mark them as a mentor
    if (status === "approved") {
      await AlumniProfile.findByIdAndUpdate(mentorRequest.alumniId, {
        isMentor: true,
        availableForMentorship: true
      });
    }

    return NextResponse.json({
      message: `Mentor request ${status} successfully`,
      request: updatedRequest
    });
  } catch (error) {
    console.error("Error updating mentor request:", error);
    return NextResponse.json(
      { error: "Failed to update mentor request" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const mentorRequest = await MentorRequest.findByIdAndDelete(id);

    if (!mentorRequest) {
      return NextResponse.json({ error: "Mentor request not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Mentor request deleted successfully" 
    });
  } catch (error) {
    console.error("[ERROR] Failed to delete mentor request:", error);
    return NextResponse.json(
      { error: "Failed to delete mentor request" },
      { status: 500 }
    );
  }
}