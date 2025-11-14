import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import dbConnect from "@/lib/dbConnect";
import Mentorship from "@/models/Mentorship";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || !["admin", "chapter-admin", "alumni"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let mentorship;
    
    if (["admin", "chapter-admin"].includes(session.user.role)) {
      // Admins and chapter-admins can view any mentorship
      mentorship = await Mentorship.findById(id).populate('mentorId menteeId', 'fullName email');
    } else {
      // Alumni can only view their own mentorships
      mentorship = await Mentorship.findOne({
        _id: id,
        $or: [
          { mentorId: session.user.id },
          { menteeId: session.user.id }
        ]
      }).populate('mentorId menteeId', 'fullName email');
    }

    if (!mentorship) {
      return NextResponse.json({ error: "Mentorship not found" }, { status: 404 });
    }

    return NextResponse.json({ mentorship });
  } catch (error) {
    console.error('[GET MENTORSHIP ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch mentorship' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || !["admin", "chapter-admin"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    const mentorship = await Mentorship.findByIdAndUpdate(
      id,
      body,
      { new: true, runValidators: true }
    ).populate('mentorId menteeId', 'fullName email');

    if (!mentorship) {
      return NextResponse.json({ error: "Mentorship not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Mentorship updated successfully",
      mentorship 
    });
  } catch (error) {
    console.error('[UPDATE MENTORSHIP ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to update mentorship' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  await dbConnect();
  
  const { id } = await params;
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const mentorship = await Mentorship.findByIdAndDelete(id);

    if (!mentorship) {
      return NextResponse.json({ error: "Mentorship not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Mentorship deleted successfully" 
    });
  } catch (error) {
    console.error('[DELETE MENTORSHIP ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to delete mentorship' },
      { status: 500 }
    );
  }
}
