// app/api/blog/[slug]/route.ts - GET single blog, PUT update, DELETE
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import { authOptions } from "@/lib/next-auth";

// GET single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();

    // Await params before accessing properties
    const { slug } = await params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Check if blog is published or user is admin
    const session = await getServerSession(authOptions);
    const isAdmin = session?.user?.role?.includes("admin");

    if (!blog.published && !isAdmin) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Increment views (only for published posts and non-admin users to avoid inflating admin views)
    if (blog.published && !isAdmin) {
      try {
        await blog.incrementViews();
      } catch (error) {
        console.error("Error incrementing views:", error);
        // Don't fail the request if view increment fails
      }
    }

    // Get related posts if any
    let relatedPosts: any[] = [];
    if (blog.relatedPosts && blog.relatedPosts.length > 0) {
      try {
        relatedPosts = await Blog.find({
          _id: { $in: blog.relatedPosts },
          published: true,
          publishedAt: { $lte: new Date() },
        })
          .select("slug title excerpt category readTime publishedAt author")
          .sort("-publishedAt")
          .limit(5);
      } catch (error) {
        console.error("Error fetching related posts:", error);
        // Continue without related posts if there's an error
      }
    }

    // Convert to plain object for response
    const blogResponse = {
      ...blog.toObject(),
      relatedPosts,
      estimatedReadTime: blog.estimatedReadTime, // Include virtual
    };

    return NextResponse.json({
      success: true,
      blog: blogResponse,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT update blog (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.role?.includes("admin")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Await params before accessing properties
    const { slug } = await params;
    const body = await request.json();

    // Validate required fields
    if (!body.title?.trim()) {
      return NextResponse.json(
        { success: false, error: "Title is required" },
        { status: 400 }
      );
    }

    if (!body.excerpt?.trim()) {
      return NextResponse.json(
        { success: false, error: "Excerpt is required" },
        { status: 400 }
      );
    }

    if (!body.content?.trim()) {
      return NextResponse.json(
        { success: false, error: "Content is required" },
        { status: 400 }
      );
    }

    if (!body.author?.name?.trim()) {
      return NextResponse.json(
        { success: false, error: "Author name is required" },
        { status: 400 }
      );
    }

    // Validate metaTitle length
    if (body.metaTitle && body.metaTitle.length > 60) {
      return NextResponse.json(
        { success: false, error: "Meta title must be 60 characters or less" },
        { status: 400 }
      );
    }

    // Validate metaDescription length
    if (body.metaDescription && body.metaDescription.length > 160) {
      return NextResponse.json(
        {
          success: false,
          error: "Meta description must be 160 characters or less",
        },
        { status: 400 }
      );
    }

    // Find existing blog
    const existingBlog = await Blog.findOne({ slug });
    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {
      ...body,
      updatedBy: session.user.id,
    };

    // Handle slug change
    if (body.slug && body.slug !== slug) {
      // Check if new slug already exists
      const existingSlug = await Blog.findOne({
        slug: body.slug,
        _id: { $ne: existingBlog._id },
      });

      if (existingSlug) {
        return NextResponse.json(
          { success: false, error: "Slug already exists" },
          { status: 400 }
        );
      }
    }

    // Handle publishing logic
    if (updateData.published) {
      if (!existingBlog.published) {
        // Publishing for the first time
        updateData.publishedAt = updateData.publishedAt
          ? new Date(updateData.publishedAt)
          : new Date();
      } else if (updateData.publishedAt) {
        // Update publish date if provided
        updateData.publishedAt = new Date(updateData.publishedAt);
      }
      // If already published and no new date provided, keep existing publishedAt
    } else {
      // Unpublishing - clear publishedAt
      updateData.publishedAt = null;
    }

    // Ensure author has userId
    if (updateData.author && !updateData.author.userId) {
      updateData.author.userId = session.user.id;
    }

    // Update the blog with validation disabled to avoid the pre-save middleware issues
    const updatedBlog = await Blog.findOneAndUpdate({ slug }, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, error: "Failed to update blog" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      blog: updatedBlog.toObject(),
      message: "Blog updated successfully",
    });
  } catch (error: any) {
    console.error("Error updating blog:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        {
          success: false,
          error: `Validation error: ${validationErrors.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json(
        { success: false, error: `${field} already exists` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE blog (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.role?.includes("admin")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    // Await params before accessing properties
    const { slug } = await params;

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 }
      );
    }

    // Store blog info for response before deletion
    const blogInfo = {
      title: blog.title,
      slug: blog.slug,
    };

    // Delete the blog
    await Blog.findOneAndDelete({ slug });

    return NextResponse.json({
      success: true,
      message: `Blog "${blogInfo.title}" deleted successfully`,
      deletedBlog: blogInfo,
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
