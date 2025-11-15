import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import MentorshipApplication from "@/models/MentorshipApplication";
import MentorshipProgram from "@/models/MentorshipProgram";
import AlumniProfile from "@/models/Alumni";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const application = await MentorshipApplication.findById(id)
      .populate({
        path: "programId",
        select: "title description category mentorshipStyle"
      })
      .populate("studentId", "fullName email avatar")
      .populate({
        path: "mentorId",
        populate: {
          path: "userId",
          select: "fullName email"
        }
      });

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Check access permissions
    const canAccess = 
      // Student can view their own application
      application.studentId._id.toString() === session.user.id ||
      // Mentor can view applications to their programs
      (session.user.role === "alumni" && 
       await AlumniProfile.findOne({ 
         userId: session.user.id, 
         _id: application.mentorId._id 
       })) ||
      // Admins can view all
      ["admin", "chapter-admin"].includes(session.user.role);

    if (!canAccess) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    return NextResponse.json({ application });
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
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

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { status, mentorResponse } = body;

    const application = await MentorshipApplication.findById(id);
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // Check permissions
    let canUpdate = false;
    
    if (session.user.role === "alumni") {
      // Mentor can accept/reject applications to their programs
      const alumniProfile = await AlumniProfile.findOne({ userId: session.user.id });
      if (alumniProfile && application.mentorId.toString() === alumniProfile._id.toString()) {
        canUpdate = true;
      }
    } else if (application.studentId.toString() === session.user.id) {
      // Student can withdraw their application
      if (status === "withdrawn") {
        canUpdate = true;
      }
    } else if (["admin", "chapter-admin"].includes(session.user.role)) {
      // Admins can update any application
      canUpdate = true;
    }

    if (!canUpdate) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Validate status transitions
    if (application.status !== "pending" && status !== "withdrawn") {
      return NextResponse.json(
        { error: "Application has already been reviewed" },
        { status: 400 }
      );
    }

    // Update application
    const updateData: any = {
      status,
      reviewedAt: new Date(),
    };

    if (mentorResponse) {
      updateData.mentorResponse = mentorResponse;
    }

    const updatedApplication = await MentorshipApplication.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate({
      path: "programId",
      select: "title description category mentorshipStyle"
    })
    .populate("studentId", "fullName email avatar")
    .populate({
      path: "mentorId",
      populate: {
        path: "userId",
        select: "fullName email"
      }
    });

    // If accepted, increment program participant count
    if (status === "accepted" && application.status === "pending") {
      await MentorshipProgram.findByIdAndUpdate(
        application.programId,
        { $inc: { currentParticipants: 1 } }
      );
    }

    // If rejected/withdrawn from accepted, decrement count
    if ((status === "rejected" || status === "withdrawn") && application.status === "accepted") {
      await MentorshipProgram.findByIdAndUpdate(
        application.programId,
        { $inc: { currentParticipants: -1 } }
      );
    }

    return NextResponse.json({
      message: `Application ${status} successfully`,
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
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

  if (!session || !["admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized - Admin access only" }, { status: 401 });
  }

  try {
    const application = await MentorshipApplication.findByIdAndDelete(id);
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // If the application was accepted, decrement the program participant count
    if (application.status === "accepted") {
      await MentorshipProgram.findByIdAndUpdate(
        application.programId,
        { $inc: { currentParticipants: -1 } }
      );
    }

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}