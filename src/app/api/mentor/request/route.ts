import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import MentorRequest from "@/models/MentorRequest";
import AlumniProfile from "@/models/Alumni";

export async function POST(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "alumni") {
    return NextResponse.json({ error: "Unauthorized - Alumni access only" }, { status: 401 });
  }

  try {
    // Get the alumni profile
    const alumniProfile = await AlumniProfile.findOne({ userId: session.user.id });
    if (!alumniProfile) {
      return NextResponse.json({ error: "Alumni profile not found" }, { status: 404 });
    }

    const body = await req.json();
    const {
      primaryExpertise,
      secondaryExpertise,
      skills,
      mentorshipStyle,
      preferredTimes,
      maxMentees,
      motivation,
      experience,
      acceptedTerms,
    } = body;

    // Validate required fields
    const missingFields = [];
    if (!primaryExpertise) missingFields.push("primaryExpertise");
    if (!skills || skills.length === 0) missingFields.push("skills");
    if (!mentorshipStyle) missingFields.push("mentorshipStyle");
    if (!preferredTimes) missingFields.push("preferredTimes");
    if (!motivation) missingFields.push("motivation");
    if (!experience) missingFields.push("experience");
    if (!acceptedTerms) missingFields.push("acceptedTerms");

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    // Check for existing pending request
    const existingRequest = await MentorRequest.findOne({
      alumniId: alumniProfile._id,
      status: "pending",
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "You already have a pending mentor request" },
        { status: 400 }
      );
    }

    // Create the mentor request
    const mentorRequest = await MentorRequest.create({
      alumniId: alumniProfile._id,
      primaryExpertise,
      secondaryExpertise,
      skills: Array.isArray(skills) ? skills : skills.split(",").map((s: string) => s.trim()),
      mentorshipStyle,
      preferredTimes,
      maxMentees: maxMentees || 3,
      motivation,
      experience,
    });

    return NextResponse.json({
      message: "Mentor request submitted successfully",
      request: mentorRequest,
    }, { status: 201 });

  } catch (error) {
    console.error("Error submitting mentor request:", error);
    return NextResponse.json(
      { error: "Failed to submit mentor request" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Build query
    let query: any = {};
    if (status) {
      query.status = status;
    }

    const requests = await MentorRequest.find(query)
      .populate({
        path: "alumniId",
        populate: {
          path: "userId",
          select: "fullName email avatar"
        }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await MentorRequest.countDocuments(query);

    return NextResponse.json({
      requests,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error fetching mentor requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch mentor requests" },
      { status: 500 }
    );
  }
}
