import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import Branch from "@/models/Chapter";
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

    const branches = await Branch.find().sort({ createdAt: -1 });

    return NextResponse.json({ branches }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch branches:", error);
    return NextResponse.json(
      { error: "Failed to fetch branches" },
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

    const {
      branchName,
      branchLocation,
      status,
      motto,
      description,
     
    } = body;

    const { adminFullName, adminEmail, adminPassword, adminPhone } = body?.admin || {};
      console.log("Admin details:");
      console.log(body.admin)
    // Validation
    if (!branchName?.trim() || !branchLocation?.trim()) {
      return NextResponse.json(
        { error: "Branch name and location are required" },
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

    // Check duplicate branch
    const existingBranch = await Branch.findOne({
      branchName: new RegExp(`^${branchName}$`, "i"),
    });
    if (existingBranch) {
      return NextResponse.json(
        { error: "Branch already exists" },
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

    // Create branch first
    const branch = new Branch({
      branchName,
      branchLocation,
      leader:{
        name:adminFullName,
        email:adminEmail,
        phone:adminPhone,

      },
      status,
      motto,
      description,
    });
    await branch.save();

    // Hash password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create branch admin
    const adminUser = new User({
      fullName: adminFullName,
      email: adminEmail,
      phone: adminPhone,
      password: hashedPassword,
      role: "branch-admin",
      branch: branch._id,
      verified: true, // optional: mark verified
    });
    await adminUser.save();

    // Update branch leader field
    branch.leader = {
      _id: adminUser._id.toString(),
      name: adminUser.fullName,
      email: adminUser.email,
      phone: adminUser.phone,
    };
    await branch.save();

    return NextResponse.json(
      {
        message: "Branch and branch admin created successfully",
        branch,
        adminUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating branch + admin:", error);
    return NextResponse.json(
      { error: "Failed to create branch and admin" },
      { status: 500 }
    );
  }
}
