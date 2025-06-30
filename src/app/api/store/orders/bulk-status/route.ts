import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/next-auth";
import { sendOrderStatusEmail } from "@/lib/Send-Mail";

export async function PATCH(req: NextRequest) {
  try {
    await dbConnect();

    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { orderIds, status } = await req.json();

    // Validate input
    if (!Array.isArray(orderIds) || orderIds.length === 0 || typeof status !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Update matching orders
    const result = await Order.updateMany(
      { _id: { $in: orderIds } },
      { status, updatedAt: new Date() }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "No orders updated" }, { status: 404 });
    }

    // Fetch updated orders to get user details for email
    const updatedOrders = await Order.find({ _id: { $in: orderIds } }).populate("user", "email fullName");

    // Send emails (optional: throttle or queue for larger batches)
    await Promise.all(
      updatedOrders.map(order =>
        sendOrderStatusEmail({
          to: order.user.email,
          name: order.user.fullName,
          orderId: order._id.toString(),
          status,
        })
      )
    );

    return NextResponse.json({
      message: `${result.modifiedCount} orders updated`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Bulk update error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
