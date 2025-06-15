import { NextResponse } from 'next/server';
import { initializePayment } from '@/lib/paystack';
import dbConnect from '@/lib/dbConnect';
import Cart from '@/models/Cart';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { shippingDetails } = await request.json();
    
    // Get user's cart
    const cart = await Cart.findOne({ user: session.user.id })
      .populate('items.product');
    
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Create order
    const order = new Order({
      user: session.user.id,
      items: cart.items.map((item:any) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total: cart.total,
      shippingDetails,
      status: 'PENDING',
    });

    await order.save();

    // Initialize Paystack payment
    const paymentData = await initializePayment({
      email: shippingDetails.email,
      amount: cart.total * 100, // Paystack uses kobo
      reference: `ORDER_${order._id}_${Date.now()}`,
      metadata: {
        orderId: order._id.toString(),
        userId: session.user.id,
      },
      callback_url: `${process.env.NEXTAUTH_URL}/checkout/verify`,
    });

    return NextResponse.json({
      authorizationUrl: paymentData.data.authorization_url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to initialize payment' },
      { status: 500 }
    );
  }
}