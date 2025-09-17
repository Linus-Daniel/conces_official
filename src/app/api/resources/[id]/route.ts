import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Resource from "@/models/Resources";
import mongoose from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/next-auth";

async function getUserFromSession(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;
  return session.user;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid resource ID" }, { status: 400 });
  }

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(resource, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const user = await getUserFromSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid resource ID" }, { status: 400 });
  }

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    const body = await req.json();

    // If this is an approval action and user is not admin, prevent it
    if (body.approved !== undefined && user.role !== "admin") {
      return NextResponse.json(
        { error: "Only admins can approve resources" },
        { status: 403 }
      );
    }

    // Chapter admin can only update their own resource (except for approval)
    if (
      user.role === "chapter-admin" &&
      resource.createdBy &&
      resource.createdBy.toString() !== user.id &&
      body.approved === undefined
    ) {
      return NextResponse.json(
        { error: "Forbidden: Not your resource" },
        { status: 403 }
      );
    }

    const updatedResource = await Resource.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updatedResource, { status: 200 });
  } catch (error) {
    console.error("PUT /resources/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update resource" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();

  const user = await getUserFromSession(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid resource ID" }, { status: 400 });
  }

  try {
    const resource = await Resource.findById(id);
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // Chapter admin can only delete their own resource
    if (
      user.role === "chapter-admin" &&
      resource.createdBy &&
      resource.createdBy.toString() !== user.id
    ) {
      return NextResponse.json(
        { error: "Forbidden: Not your resource" },
        { status: 403 }
      );
    }

    await Resource.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Resource deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE /resources/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete resource" },
      { status: 500 }
    );
  }
}
