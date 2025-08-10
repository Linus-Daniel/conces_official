// app/api/executives/route.ts - GET and POST for /api/executives

import { NextRequest, NextResponse } from "next/server";
import Executive from "@/models/Executive";
import dbConnect from "@/lib/dbConnect";

// =======================
// GET /api/executives
// =======================
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const position = searchParams.get("position");
    const institution = searchParams.get("institution");
    const course = searchParams.get("course");
    const level = searchParams.get("level");
    const status = searchParams.get("status");
    const session = searchParams.get("session");
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const sort = searchParams.get("sort") || "position";

    // Build filter object
    const filter: Record<string, any> = {};
    if (position) filter.position = { $regex: position, $options: "i" };
    if (institution)
      filter.institution = { $regex: institution, $options: "i" };
    if (course) filter.course = { $regex: course, $options: "i" };
    if (level) filter.level = level;
    if (status) filter.status = status;
    if (session) filter.session = { $regex: session, $options: "i" };

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Fetch executives with filtering, sorting, and pagination
    const executives = await Executive.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Executive.countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: executives,
      pagination: {
        current_page: page,
        per_page: limit,
        total_records: total,
        total_pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching executives:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching executives",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// =======================
// POST /api/executives
// =======================
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const {
      name,
      course,
      institution,
      level,
      position,
      session,
      avatar,
      status,
      state,
      department,
    } = body;

    // Validate required fields
    if (
      !name ||
      !course ||
      !institution ||
      !level ||
      !position ||
      !department
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing required fields: name, course, institution, level, position, department",
        },
        { status: 400 }
      );
    }

    // Ensure position is unique for session when active
    if (!status || status === "Active") {
      const existingExecutive = await Executive.findOne({
        position,
        session: session || "2024/2025 Spiritual Session",
        status: "Active",
      });

      if (existingExecutive) {
        return NextResponse.json(
          {
            success: false,
            message: `Position "${position}" is already assigned to ${existingExecutive.name} for this session`,
          },
          { status: 400 }
        );
      }
    }

    // Create new executive
    const newExecutive = new Executive({
      name: name.trim(),
      course: course.trim(),
      institution: institution.trim(),
      level,
      avatar,
      position: position.trim(),
      session: session || "2024/2025 Spiritual Session",
      status: status || "Active",
      state: state?.trim(),
      department: department.trim(),
    });

    const savedExecutive = await newExecutive.save();

    return NextResponse.json(
      {
        success: true,
        message: "Executive created successfully",
        data: savedExecutive,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating executive:", error);

    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        {
          success: false,
          message: "Validation error",
          errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error creating executive",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
