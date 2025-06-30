import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import Branch from "@/models/Branch";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const userRole = session?.user.role;

  if (userRole !== "admin" && userRole !== "branch-admin") {
    console.log("Unauthorized request");
    return NextResponse.json(
      { error: "Not authorized to make this request" },
      { status: 401 }
    );
  }

  // Await the params since it's now a Promise
  const { id } = await params;

  if (!id) {
    console.log("Missing branch id");
    return NextResponse.json(
      { error: "Branch ID is required" },
      { status: 400 }
    );
  }

  try {
    const branch = await Branch.findById(id);
    if (!branch) {
      console.log("Branch not found");
      return NextResponse.json(
        { error: "Branch not found" },
        { status: 404 }
      );
    }

    console.log("Fetch successful");
    return NextResponse.json(
      { message: "Branch fetched successfully", branch },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching branch" },
      { status: 500 }
    );
  }
}

// UPDATE
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
  
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
  
    if (role !== "admin" && role !== "branch-admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const body = await request.json();
      // Await the params since it's now a Promise
      const { id } = await params;
      const branch = await Branch.findByIdAndUpdate(id, body, { new: true });
  
      if (!branch) {
        return NextResponse.json({ error: "Branch not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Branch updated", branch });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Failed to update branch" }, { status: 500 });
    }
  }
  
  // DELETE
  export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
  
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
  
    if (role !== "admin") {
      return NextResponse.json({ error: "Only admins can delete branches" }, { status: 403 });
    }
  
    try {
      // Await the params since it's now a Promise
      const { id } = await params;
      const deleted = await Branch.findByIdAndDelete(id);
  
      if (!deleted) {
        return NextResponse.json({ error: "Branch not found" }, { status: 404 });
      }
  
      return NextResponse.json({ message: "Branch deleted successfully" });
    } catch (err) {
      console.error(err);
      return NextResponse.json({ error: "Failed to delete branch" }, { status: 500 });
    }
  }