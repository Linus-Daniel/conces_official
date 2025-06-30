import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await dbConnect();
  
  try {
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" }, 
        { status: 404 }
      );
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch post" }, 
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await dbConnect();
  
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" }, 
        { status: 404 }
      );
    }

    // Only the post owner can update
    if (post.author.userId.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Forbidden" }, 
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, content, images } = body;

    // Update only provided fields
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (images !== undefined) post.images = images;
    
    await post.save();

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" }, 
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  await dbConnect();
  
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" }, 
        { status: 401 }
      );
    }

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" }, 
        { status: 404 }
      );
    }

    const isOwner = post.author.userId.toString() === session.user.id;
    const isAdmin = session.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return NextResponse.json(
        { error: "Forbidden" }, 
        { status: 403 }
      );
    }

    await post.deleteOne();
    
    return NextResponse.json(
      { message: "Post deleted successfully" }, 
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post" }, 
      { status: 500 }
    );
  }
}