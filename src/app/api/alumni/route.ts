// app/api/alumni/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import AlumniProfile from "@/models/Alumni";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { currentRole: { $regex: search, $options: "i" } },
          { specialization: { $regex: search, $options: "i" } },
          { "education.schoolName": { $regex: search, $options: "i" } },
          { "education.course": { $regex: search, $options: "i" } },
        ],
      };
    }

    const alumni = await AlumniProfile.find(searchQuery)
      .populate("userId", "name email")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await AlumniProfile.countDocuments(searchQuery);

    return NextResponse.json({
      alumni,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching alumni:", error);
    return NextResponse.json(
      { error: "Failed to fetch alumni" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const alumni = await AlumniProfile.create(body);

    return NextResponse.json(
      { message: "Alumni profile created", alumni },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating alumni:", error);
    return NextResponse.json(
      { error: "Failed to create alumni profile" },
      { status: 500 }
    );
  }
}
