import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Order from '@/models/Order';
import Cart from '@/models/Cart';
import { verifyPayment } from '@/lib/paystack';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/next-auth';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json({ error: 'Missing transaction reference' }, { status: 400 });
    }

    const { data: paymentData } = await verifyPayment(reference);

    if (paymentData.status !== 'success') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }

    const orderId = paymentData.metadata?.orderId;
    const userId = paymentData.metadata?.userId;

    if (!orderId || !userId) {
      return NextResponse.json({ error: 'Invalid payment metadata' }, { status: 400 });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // Update order status
    order.status = 'PAID';
    await order.save();

    // Clear the user's cart
    await Cart.findOneAndUpdate(
      { user: userId },
      { $set: { items: [], total: 0 } }
    );

    return NextResponse.json({ status: 'success', message: 'Payment verified, order updated, and cart cleared', order });
  } catch (error: any) {
    console.error('Payment verification error:', error?.response?.data || error);
    return NextResponse.json(
      { error: 'Failed to verify payment', details: error?.response?.data || error.message },
      { status: 500 }
    );
  }
}
