import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import MentorshipProgram from "@/models/MentorshipProgram";
import AlumniProfile from "@/models/Alumni";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "alumni") {
    return NextResponse.json({ error: "Unauthorized - Alumni access only" }, { status: 401 });
  }

  try {
    // Get the alumni profile and check if they're an approved mentor
    const alumniProfile = await AlumniProfile.findOne({ userId: session.user.id });
    if (!alumniProfile) {
      return NextResponse.json({ error: "Alumni profile not found" }, { status: 404 });
    }

    if (!alumniProfile.isMentor) {
      return NextResponse.json({ 
        error: "You must be an approved mentor to create mentorship programs" 
      }, { status: 403 });
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
      applicationDeadline,
      programStartDate,
      programEndDate,
      meetingPlatform,
      tags,
    } = body;

    // Validate required fields
    const missingFields = [];
    if (!title) missingFields.push("title");
    if (!description) missingFields.push("description");
    if (!category) missingFields.push("category");
    if (!topics || topics.length === 0) missingFields.push("topics");
    if (!mentorshipStyle) missingFields.push("mentorshipStyle");
    if (!duration) missingFields.push("duration");
    if (!timeCommitment) missingFields.push("timeCommitment");
    if (!schedule) missingFields.push("schedule");
    if (!maxParticipants || maxParticipants < 1) missingFields.push("maxParticipants");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Create the mentorship program
    const program = await MentorshipProgram.create({
      mentorId: alumniProfile._id,
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
      objectives: objectives || [],
      applicationDeadline: applicationDeadline ? new Date(applicationDeadline) : undefined,
      programStartDate: programStartDate ? new Date(programStartDate) : undefined,
      programEndDate: programEndDate ? new Date(programEndDate) : undefined,
      meetingPlatform,
      tags: tags || [],
    });

    return NextResponse.json({
      message: "Mentorship program created successfully",
      program,
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating mentorship program:", error);
    return NextResponse.json(
      { error: "Failed to create mentorship program" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const mentorshipStyle = searchParams.get("mentorshipStyle");
    const search = searchParams.get("search");
    const isActive = searchParams.get("isActive");
    const mentorId = searchParams.get("mentorId");
    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (mentorshipStyle) {
      query.mentorshipStyle = mentorshipStyle;
    }
    
    if (isActive !== null) {
      query.isActive = isActive === "true";
    } else {
      query.isActive = true; // Default to only active programs
    }
    
    if (mentorId) {
      query.mentorId = mentorId;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { topics: { $in: [new RegExp(search, "i")] } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const programs = await MentorshipProgram.find(query)
      .populate({
        path: "mentorId",
        populate: {
          path: "userId",
          select: "fullName avatar"
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MentorshipProgram.countDocuments(query);

    return NextResponse.json({
      programs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching mentorship programs:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentorship programs" },
      { status: 500 }
    );
  }
}