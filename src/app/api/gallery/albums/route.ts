// app/api/gallery/albums/route.ts
import { NextRequest, NextResponse } from "next/server";
import Gallery from "@/models/Gallery";
import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();

    const albums = await Gallery.aggregate([
      {
        $group: {
          _id: {
            event: "$event",
            category: "$category",
          },
          count: { $sum: 1 },
          latestImage: { $first: "$imageUrl" },
          createdAt: { $max: "$createdAt" },
        },
      },
      {
        $project: {
          _id: 0,
          event: "$_id.event",
          category: "$_id.category",
          count: 1,
          latestImage: 1,
          createdAt: 1,
          albumId: {
            $concat: [
              { $ifNull: ["$_id.event", "no-event"] },
              "-",
              { $ifNull: ["$_id.category", "no-category"] },
            ],
          },
        },
      },
      { $sort: { createdAt: -1 } },
    ]);

    return NextResponse.json(albums);
  } catch (error) {
    console.error("GET /api/gallery/albums error:", error);
    return NextResponse.json(
      { error: "Failed to fetch albums" },
      { status: 500 }
    );
  }
}
