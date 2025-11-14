// app/api/store/orders/route.ts
import Product from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const product =  await Product.find();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role;
    let orders;

    // Admin can see all orders, regular users can only see their own orders
    if (userRole === "admin" || userRole === "chapter-admin") {
      orders = await Order.find({})
        .populate("user", "fullName email")
        .populate("items.product shippingDetails", "name price images")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ user: session.user.id })
        .populate("items.product", "name price images")
        .sort({ createdAt: -1 });
    }

    return NextResponse.json({
      status: 200,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
