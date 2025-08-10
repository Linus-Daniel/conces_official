// app/api/executives/batch-update/route.js - Batch operations for session transitions
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Executive from "@/models/Executive";

// POST /api/executives/batch-update - Batch update executives (e.g., mark previous session as Excos)
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { action, session, newStatus } = body;

    if (action === "update_session_status") {
      if (!session || !newStatus) {
        return NextResponse.json(
          {
            success: false,
            message: "Session and newStatus are required",
          },
          { status: 400 }
        );
      }

      // Update all executives from a specific session
      const result = await Executive.updateMany(
        { session: session },
        { $set: { status: newStatus } }
      );

      return NextResponse.json({
        success: true,
        message: `Updated ${result.modifiedCount} executives to ${newStatus} status`,
        data: {
          matched: result.matchedCount,
          modified: result.modifiedCount,
        },
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid action",
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Error in batch update:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in batch update",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
