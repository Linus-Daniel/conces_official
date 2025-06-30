// app/api/store/orders/[id]/status/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Order from "@/models/Order";
import { authOptions } from "@/lib/next-auth";
import { sendOrderStatusEmail } from "@/lib/Send-Mail";
import { getServerSession } from "next-auth";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { status } = await req.json();
    
    // Await the params since it's now a Promise
    const { id } = await params;

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("user", "email fullName");

    if (!updatedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Send notification email
    await sendOrderStatusEmail({
      to: updatedOrder.user.email,
      name: updatedOrder.user.fullName,
      orderId: updatedOrder._id.toString(),
      status,
    });

    return NextResponse.json({
      message: "Order status updated and email sent",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Update status error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}