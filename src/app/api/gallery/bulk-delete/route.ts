// app/api/gallery/bulk-delete/route.ts
import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/models/Album";
import dbConnect from "@/lib/dbConnect";

export async function DELETE(request: NextRequest) {
  try {
    await dbConnect();

    const { ids } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid or empty ids array" },
        { status: 400 }
      );
    }

    const result = await Gallery.deleteMany({
      _id: { $in: ids },
    });

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} images deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("DELETE /api/gallery/bulk-delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete images" },
      { status: 500 }
    );
  }
}
