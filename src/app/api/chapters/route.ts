import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import Chapter from "@/models/Chapter";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  try {
    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role;

    const chapters = await Chapter.find().sort({ createdAt: -1 });
    console.log(chapters)

    return NextResponse.json({ chapters }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch chapters:", error);
    return NextResponse.json(
      { error: "Failed to fetch chapters" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role;

    if (userRole !== "admin") {
      console.log("Unauthorized POST attempt");
      return NextResponse.json({ error: "Not authorized" }, { status: 401 });
    }

    const body = await request.json();
    console.log("Incoming payload:", body);

    const { chapterName, chapterLocation, status, motto, description } = body;

    const { adminFullName, adminEmail, adminPassword, adminPhone } =
      body?.admin || {};
    console.log("Admin details:");
    console.log(body.admin);
    // Validation
    if (!chapterName?.trim() || !chapterLocation?.trim()) {
      return NextResponse.json(
        { error: "Chapter name and location are required" },
        { status: 400 }
      );
    }
    if (
      !adminFullName?.trim() ||
      !adminEmail?.trim() ||
      !adminPassword?.trim()
    ) {
      console.log("Validation failed for admin details");
      console.log({ adminFullName, adminEmail, adminPassword });
      return NextResponse.json(
        { error: "Admin full name, email, and password are required" },
        { status: 400 }
      );
    }

    // Check duplicate chapter
    const existingChapter = await Chapter.findOne({
      chapterName: new RegExp(`^${chapterName}$`, "i"),
    });
    if (existingChapter) {
      return NextResponse.json(
        { error: "Chapter already exists" },
        { status: 409 }
      );
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      return NextResponse.json(
        { error: "Admin with this email already exists" },
        { status: 409 }
      );
    }

    // Create chapter first
    const chapter = new Chapter({
      chapterName,
      chapterLocation,
      leader: {
        name: adminFullName,
        email: adminEmail,
        phone: adminPhone,
      },
      status,
      motto,
      description,
    });
    await chapter.save();

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create chapter admin
    const adminUser = new User({
      fullName: adminFullName,
      email: adminEmail,
      phone: adminPhone,
      password: hashedPassword,
      role: "chapter-admin",
      chapter: chapter._id,
      verified: true, // optional: mark verified
    });
    await adminUser.save();

    // Update chapter leader field
    chapter.leader = {
      _id: adminUser._id.toString(),
      name: adminUser.fullName,
      email: adminUser.email,
      phone: adminUser.phone,
    };
    await chapter.save();

    return NextResponse.json(
      {
        message: "Chapter and chapter admin created successfully",
        chapter,
        adminUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating chapter + admin:", error);
    return NextResponse.json(
      { error: "Failed to create chapter and admin" },
      { status: 500 }
    );
  }
}
