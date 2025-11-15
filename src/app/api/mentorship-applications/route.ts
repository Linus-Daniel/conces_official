import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import MentorshipApplication from "@/models/MentorshipApplication";
import MentorshipProgram from "@/models/MentorshipProgram";
import AlumniProfile from "@/models/Alumni";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !["user", "alumni"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      programId,
      message,
      motivation,
      goals,
      experience,
      availability,
    } = body;

    // Validate required fields
    const missingFields = [];
    if (!programId) missingFields.push("programId");
    if (!message) missingFields.push("message");
    if (!motivation) missingFields.push("motivation");
    if (!goals || goals.length === 0) missingFields.push("goals");
    if (!availability) missingFields.push("availability");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Check if the program exists and is active
    const program = await MentorshipProgram.findById(programId);
    if (!program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 });
    }

    if (!program.isActive) {
      return NextResponse.json({ error: "Program is no longer active" }, { status: 400 });
    }

    if (program.currentParticipants >= program.maxParticipants) {
      return NextResponse.json({ error: "Program is full" }, { status: 400 });
    }

    // Check if application deadline has passed
    if (program.applicationDeadline && new Date() > program.applicationDeadline) {
      return NextResponse.json({ error: "Application deadline has passed" }, { status: 400 });
    }

    // Check if user already applied to this program
    const existingApplication = await MentorshipApplication.findOne({
      programId,
      studentId: session.user.id,
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "You have already applied to this program" },
        { status: 400 }
      );
    }

    // Create the application
    const application = await MentorshipApplication.create({
      programId,
      mentorId: program.mentorId,
      studentId: session.user.id,
      message,
      motivation,
      goals: Array.isArray(goals) ? goals : [goals],
      experience,
      availability,
    });

    return NextResponse.json({
      message: "Application submitted successfully",
      application,
    }, { status: 201 });

  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Failed to submit application" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const programId = searchParams.get("programId");
    const skip = (page - 1) * limit;

    // Build query based on user role
    let query: any = {};
    
    if (session.user.role === "alumni") {
      // Alumni can see applications to their programs
      const alumniProfile = await AlumniProfile.findOne({ userId: session.user.id });
      if (!alumniProfile) {
        return NextResponse.json({ error: "Alumni profile not found" }, { status: 404 });
      }
      query.mentorId = alumniProfile._id;
    } else if (["user", "alumni"].includes(session.user.role)) {
      // Users can see their own applications
      query.studentId = session.user.id;
    } else if (["admin", "chapter-admin"].includes(session.user.role)) {
      // Admins can see all applications
    } else {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    if (status) {
      query.status = status;
    }

    if (programId) {
      query.programId = programId;
    }

    const applications = await MentorshipApplication.find(query)
      .populate({
        path: "programId",
        select: "title category mentorshipStyle"
      })
      .populate("studentId", "fullName email avatar")
      .populate({
        path: "mentorId",
        populate: {
          path: "userId",
          select: "fullName email"
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MentorshipApplication.countDocuments(query);

    return NextResponse.json({
      applications,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    );
  }
}