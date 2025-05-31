// app/api/verify-payment/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json({ status: 'error', message: 'No reference provided' }, { status: 400 });
  }

  try {
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
      cache: 'no-store',
    });

    const data = await verifyRes.json();

    if (data.status) {
      return NextResponse.json({ status: 'success', data: data.data }, { status: 200 });
    } else {
      return NextResponse.json({ status: 'error', message: data.message }, { status: 400 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}
