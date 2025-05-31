// src/app/api/trpc/[trpc]/verify-payment/route.ts

import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get('reference');

  if (!reference) {
    return NextResponse.json(
      { status: 'error', message: 'Missing transaction reference' },
      { status: 400 }
    );
  }

  try {
    const paystackRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer sk_test_988165e455709b8ddde1cb826d0e68c59eedda86`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data = paystackRes.data;
    return NextResponse.json({ status: 'success', data: data.data }, { status: 200 });
  } catch (error: any) {
    console.error('Verification error:', error.response?.data || error.message);
    return NextResponse.json(
      {
        status: 'error',
        message: error.response?.data?.message || 'Internal server error',
      },
      { status: 500 }
    );
  }
}
