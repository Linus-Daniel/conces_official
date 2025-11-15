import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import MentorshipProgram from "@/models/MentorshipProgram";
import AlumniProfile from "@/models/Alumni";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;

  try {
    const program = await MentorshipProgram.findById(id)
      .populate({
        path: "mentorId",
        populate: {
          path: "userId",
          select: "fullName avatar email"
        }
      });

    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    return NextResponse.json({ program });
  } catch (error) {
    console.error("Error fetching mentorship program:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentorship program" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "alumni") {
    return NextResponse.json({ error: "Unauthorized - Alumni access only" }, { status: 401 });
  }

  try {
    const alumniProfile = await AlumniProfile.findOne({ userId: session.user.id });
    if (!alumniProfile) {
      return NextResponse.json({ error: "Alumni profile not found" }, { status: 404 });
    }

    const program = await MentorshipProgram.findById(id);
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    // Check if the user owns this program
    if (program.mentorId.toString() !== alumniProfile._id.toString()) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await req.json();
    const {
      title,
      description,
      category,
      topics,
      mentorshipStyle,
      duration,
      timeCommitment,
      schedule,
      maxParticipants,
      prerequisites,
      objectives,
      isActive,
      applicationDeadline,
      programStartDate,
      programEndDate,
      meetingPlatform,
      tags,
    } = body;

    // Update the program
    const updatedProgram = await MentorshipProgram.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(description && { description }),
        ...(category && { category }),
        ...(topics && { topics }),
        ...(mentorshipStyle && { mentorshipStyle }),
        ...(duration && { duration }),
        ...(timeCommitment && { timeCommitment }),
        ...(schedule && { schedule }),
        ...(maxParticipants && { maxParticipants }),
        ...(prerequisites !== undefined && { prerequisites }),
        ...(objectives && { objectives }),
        ...(isActive !== undefined && { isActive }),
        ...(applicationDeadline && { applicationDeadline: new Date(applicationDeadline) }),
        ...(programStartDate && { programStartDate: new Date(programStartDate) }),
        ...(programEndDate && { programEndDate: new Date(programEndDate) }),
        ...(meetingPlatform !== undefined && { meetingPlatform }),
        ...(tags && { tags }),
      },
      { new: true }
    ).populate({
      path: "mentorId",
      populate: {
        path: "userId",
        select: "fullName avatar email"
      }
    });

    return NextResponse.json({
      message: "Program updated successfully",
      program: updatedProgram,
    });
  } catch (error) {
    console.error("Error updating mentorship program:", error);
    return NextResponse.json(
      { error: "Failed to update mentorship program" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "alumni") {
    return NextResponse.json({ error: "Unauthorized - Alumni access only" }, { status: 401 });
  }

  try {
    const alumniProfile = await AlumniProfile.findOne({ userId: session.user.id });
    if (!alumniProfile) {
      return NextResponse.json({ error: "Alumni profile not found" }, { status: 404 });
    }

    const program = await MentorshipProgram.findById(id);
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    // Check if the user owns this program
    if (program.mentorId.toString() !== alumniProfile._id.toString()) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Soft delete by setting isActive to false
    await MentorshipProgram.findByIdAndUpdate(id, { isActive: false });

    return NextResponse.json({
      message: "Program deactivated successfully",
    });
  } catch (error) {
    console.error("Error deleting mentorship program:", error);
    return NextResponse.json(
      { error: "Failed to delete mentorship program" },
      { status: 500 }
    );
  }
}