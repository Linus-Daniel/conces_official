import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import User from "@/models/User";
import Product from "@/models/Product";
import PrayerRequest from "@/models/PrayerRequest";
import Events from "@/models/Events";

export async function GET(request: NextRequest,{params}:{params:Promise<{id:string}>}) {
  try {
    await dbConnect();
    const {id} = await params;
    const session = await getServerSession(authOptions);
    const user = session?.user;
    const userRole = user?.role;
    if (userRole !== "chapter-admin" && userRole !== "admin" && userRole !== "alumni") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if(!id){
        return NextResponse.json({ error: "Chapter ID is required" }, { status: 400 });
    }
    // Fetch product count
    const products = await Product.find({chapter:id}).countDocuments();

    // Fetch prayer request count
    const prayers = await PrayerRequest.find({chapter:id}).countDocuments();

    // Fetch event count
    const events = await Events.find({chapter:id}).countDocuments();
    const users = await User.find({chapter:id}).countDocuments();


    return NextResponse.json({
      users,
      products,
      prayers,
      events,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
