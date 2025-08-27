// app/api/gallery/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect  from "@/lib/dbConnect";
import Gallery from "@/models/Gallery";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const event = searchParams.get("event");
    const tags = searchParams.get("tags");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");

    let filter: any = {};

    if (category) filter.category = category;
    if (event) filter.event = new RegExp(event, "i");
    if (tags) filter.tags = { $in: tags.split(",") };

    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const [images, total] = await Promise.all([
      Gallery.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Gallery.countDocuments(filter),
    ]);

    return NextResponse.json({
      images,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { images } = body;

    // Handle bulk upload
    if (Array.isArray(images)) {
      const createdImages = await Gallery.insertMany(images);
      return NextResponse.json(
        {
          success: true,
          message: `${createdImages.length} images uploaded successfully`,
          images: createdImages,
        },
        { status: 201 }
      );
    }

    // Handle single upload
    const newImage = await Gallery.create(body);
    return NextResponse.json(
      {
        success: true,
        message: "Image uploaded successfully",
        image: newImage,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json(
      { error: "Failed to upload image(s)" },
      { status: 500 }
    );
  }
}
