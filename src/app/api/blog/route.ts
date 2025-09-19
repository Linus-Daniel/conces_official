// app/api/blog/route.ts - GET all blogs, POST new blog
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { authOptions } from "@/lib/next-auth";

// GET all blogs (with filters)
export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const published = searchParams.get("published");
    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const search = searchParams.get("search");

    // Build filter
    const filter: any = {};

    // For public view, only show published posts
    const session = await getServerSession(authOptions);
    if (!session?.user?.role?.includes("admin")) {
      filter.published = true;
      filter.publishedAt = { $lte: new Date() };
    } else if (published !== null) {
      filter.published = published === "true";
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    if (featured !== null) {
      filter.featured = featured === "true";
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .sort({ featured: -1, publishedAt: -1, createdAt: -1 })
        .limit(limit)
        .skip(skip)
        .select("-content -comments"), // Exclude heavy fields for list
      Blog.countDocuments(filter),
    ]);

    return NextResponse.json({
      success: true,
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.role?.includes("admin")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();

    // Generate slug if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
    }

    // Add creator info
    body.createdBy = session.user.id;
    body.author = {
      ...body.author,
      userId: session.user.id,
    };

    const blog = await Blog.create(body);

    return NextResponse.json(
      {
        success: true,
        blog,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
