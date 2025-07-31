import dbConnect from "@/lib/dbConnect";
import { authOptions } from "@/lib/next-auth";
import { getServerSession } from "next-auth";
import Branch from "@/models/Branch";
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
    console.log(body)
    const { branchName, branchLocation } = body;

    if (!branchName?.trim() || !branchLocation?.trim()) {
      return NextResponse.json(
        { error: "Name and Location are required" },
        { status: 400 }
      );
    }

    const existingBranch = await Branch.findOne({
      branchName: new RegExp(`^${branchName}$`, "i"),
    });

    if (existingBranch) {
      return NextResponse.json(
        { error: "Branch already exists" },
        { status: 409 }
      );
    }

    const branch = new Branch({ branchName, branchLocation });
    await branch.save();

    return NextResponse.json(
      { message: "Branch created successfully", branch },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating a branch:", error);
    return NextResponse.json(
      { error: "Failed to create branch" },
      { status: 500 }
    );
  }
}
