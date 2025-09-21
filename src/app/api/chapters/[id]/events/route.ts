import dbConnect from '@/lib/dbConnect';
import { authOptions } from '@/lib/next-auth';
import Chapter from '@/models/Chapter';
import Event from '@/models/Events';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(req: NextRequest, {params}: {params :Promise<{id:string}>}) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  console.log(user);
  const {id} = await params

  try {
    const B = await Chapter.find();

    await dbConnect();
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 500 }
    );
  }

  try {
    if (user?.role != "admin" && user?.chapter != id) {
      console.log("Admin user detected, fetching all events");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    }

    const events = await Event.find({ chapter:id })
      .sort({ date: 1 })
      .populate("chapter", "chapterName");
    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}