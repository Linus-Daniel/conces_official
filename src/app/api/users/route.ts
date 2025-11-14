// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Chapter from "@/models/Chapter";
import Error from "next/error";

export async function GET(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Authorization check - only admins and chapter-admins can access users
    const userRole = session.user.role;
    if (!userRole || !["admin", "chapter-admin"].includes(userRole)) {
      return NextResponse.json(
        { message: "Forbidden - Insufficient permissions" },
        { status: 403 }
      );
    }

    await dbConnect();
    const _ = await Chapter.find();
    
    // For chapter-admins, only return users from their chapter
    let users;
    if (userRole === "chapter-admin") {
      const userChapter = session.user.chapter;
      if (!userChapter) {
        return NextResponse.json(
          { message: "Chapter information not found for user" },
          { status: 400 }
        );
      }
      users = await User.find({ chapter: userChapter }).lean().populate("chapter", "chapterName");
    } else {
      // Admins can see all users
      users = await User.find({}).lean().populate("chapter", "chapterName");
    }

    return NextResponse.json({ status: 200, message: "success", users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authentication check
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { message: "Unauthorized - Please sign in" },
        { status: 401 }
      );
    }

    // Authorization check - only admins can create users
    const userRole = session.user.role;
    if (!userRole || userRole !== "admin") {
      return NextResponse.json(
        { message: "Forbidden - Only admins can create users" },
        { status: 403 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { fullName, email, phone, role, chapter, institution } = body;

    // Validate required fields
    if (!fullName || !email || !role || !chapter) {
      return NextResponse.json(
        {
          message: "Missing required fields: fullName, email, role, and chapter are required",
        },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Validate chapter exists
    const chapterExists = await Chapter.findById(chapter);
    if (!chapterExists) {
      return NextResponse.json(
        { message: "Chapter not found" },
        { status: 400 }
      );
    }

    // Create new user with default password (they'll need to reset it)
    const defaultPassword = "password123"; // They should change this
    const newUser = new User({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim(),
      role,
      chapter,
      institution: institution?.trim(),
      password: defaultPassword, // Will be hashed by the User model pre-save hook
      status: "active",
    });

    const savedUser = await newUser.save();

    // Remove password from response
    const { password, ...userResponse } = savedUser.toObject();

    return NextResponse.json(
      {
        status: 201,
        message: "User created successfully. Default password is 'password123' - user should change it upon first login.",
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error:Error | any) {
    console.error("Error creating user:", error);
    
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        {
          message: "Validation error",
          errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
