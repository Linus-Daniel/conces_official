import { NextResponse } from 'next/server';
import { initializePayment } from '@/lib/paystack';
import dbConnect from '@/lib/dbConnect';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { email, amount, donorName, purpose } = await request.json();

    if (!email || !amount) {
      return NextResponse.json(
        { error: 'Email and amount are required' },
        { status: 400 }
      );
    }

    const reference = `DONATION_${Date.now()}`;

    const paymentData = await initializePayment({
      email,
      amount: amount * 100, // convert to kobo
      reference,
      metadata: {
        donorName,
        purpose: purpose || 'General Donation',
      },
      callback_url: `${process.env.NEXTAUTH_URL}/donation/verify`,
    });

    return NextResponse.json({
      authorizationUrl: paymentData.data.authorization_url,
    });
  } catch (error) {
    console.error('Donation error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate donation' },
      { status: 500 }
    );
  }
}
