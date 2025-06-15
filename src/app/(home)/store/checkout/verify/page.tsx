'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyPayment } from '@/lib/paystack';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PaymentVerificationPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (!reference) {
      setStatus('failed');
      setMessage('No payment reference provided');
      return;
    }

    const verify = async () => {
      try {
        const response = await fetch(`/api/payment/verify?reference=${reference}`);
        const data = await response.json();

        if (data.status === 'success') {
          setStatus('success');
          setMessage('Payment successful! Your order is being processed.');
        } else {
          setStatus('failed');
          setMessage(data.message || 'Payment verification failed');
        }
      } catch (error) {
        setStatus('failed');
        setMessage('Error verifying payment');
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[60vh]">
      {status === 'pending' && (
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Verifying your payment...</h2>
          <p className="text-muted-foreground mt-2">
            Please wait while we verify your payment
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Payment Successful!</h2>
          <p className="text-muted-foreground mt-2">{message}</p>
          <div className="mt-6">
            <Button onClick={() => router.push('/account/orders')}>
              View Your Orders
            </Button>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div className="text-center">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold">Payment Failed</h2>
          <p className="text-muted-foreground mt-2">{message}</p>
          <div className="mt-6">
            <Button onClick={() => router.push('/checkout')}>
              Try Again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}