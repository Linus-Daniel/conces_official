import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Donation from '@/models/Donation';
import { verifyPayment } from '@/lib/paystack';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { reference } = await req.json();
    if (!reference) {
      return NextResponse.json({ error: 'Reference is required' }, { status: 400 });
    }

    // Call Paystack verify API
    const payment = await verifyPayment(reference);
    const data = payment?.data;

    if (!data || data.status !== 'success') {
      return NextResponse.json({ error: 'Payment not successful' }, { status: 400 });
    }

    // Extract data
    const {
      amount,
      paid_at: paidAt,
      customer,
      reference: paymentRef,
      metadata,
    } = data;

    // Create or update donation record
    const donation = await Donation.findOneAndUpdate(
      { reference: paymentRef },
      {
        email: customer.email,
        donorName: metadata?.donorName || 'Anonymous',
        anonymous: metadata?.anonymous || false,
        amount,
        paidAt,
        purpose: metadata?.purpose || 'General Donation',
        status: 'success',
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      message: 'Donation verified successfully',
      ...donation.toObject(),
    });
  } catch (error) {
    console.error('Donation verification error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
