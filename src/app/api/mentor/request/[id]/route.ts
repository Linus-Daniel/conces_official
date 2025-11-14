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

  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const mentorRequest = await MentorRequest.findById(id)
      .populate("userId", "fullName email avatar");

    if (!mentorRequest) {
      return NextResponse.json({ error: "Mentor request not found" }, { status: 404 });
    }

    return NextResponse.json({ data: mentorRequest });
  } catch (error) {
    console.error("[ERROR] Failed to fetch mentor request:", error);
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
    const { status } = body;

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
    mentorRequest.status = status;
    mentorRequest.reviewedAt = new Date();
    mentorRequest.reviewedBy = session.user.id;
    await mentorRequest.save();

    // If approved, update the alumni profile to mark them as a mentor
    if (status === "approved") {
      await AlumniProfile.findOneAndUpdate(
        { userId: mentorRequest.userId },
        { 
          isMentor: true,
          availableForMentorship: true
        }
      );

      // Optional: Update user role if needed
      // await User.findByIdAndUpdate(mentorRequest.userId, { role: "mentor" });
    }

    return NextResponse.json({
      message: `Mentor request ${status} successfully`,
      data: mentorRequest
    });
  } catch (error) {
    console.error("[ERROR] Failed to update mentor request:", error);
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