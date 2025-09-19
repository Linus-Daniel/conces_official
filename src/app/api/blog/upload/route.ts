// app/api/blog/upload/route.ts - Handle image uploads
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.role?.includes("admin")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.name.replace(/\s+/g, "-").toLowerCase();
    const finalFilename = `${uniqueSuffix}-${filename}`;

    // Save to public/uploads directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", "blog");
    const filepath = path.join(uploadDir, finalFilename);

    await writeFile(filepath, buffer);

    // Return the URL
    const url = `/uploads/blog/${finalFilename}`;

    return NextResponse.json({
      success: true,
      url,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
