'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, XCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import api from '@/lib/axiosInstance';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import useCart from '@/zustand/useCart';

export default function PaymentVerificationPage() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const [status, setStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const {fetchCart} = useCart()

  useEffect(() => {
    if (!reference) {
      setStatus('failed');
      setMessage('No payment reference provided');
      return;
    }

    const verify = async () => {
      try {
        // Simulate progress for better UX
        const interval = setInterval(() => {
          setProgress(prev => Math.min(prev + 10, 90));
        }, 300);

        const response = await api.post("/store/payment/verify", { reference });
        clearInterval(interval);
        setProgress(100);

        const data = response.data?.order.status;
        console.log(data)

        if (data === 'PAID') {
          setStatus('success');
          setMessage('Payment successful! Your order is being processed.');
          // Clear cart or perform other success actions\
          await fetchCart()
          router.replace("/store")

        } else {
          setStatus('failed');
          setMessage(data.message || 'Payment verification failed');
        }
      } catch (error) {
        setStatus('failed');
        setMessage(error instanceof Error ? error.message : 'Error verifying payment');
      }
    };

    verify();
  }, [reference]);

  return (
    <div className="container py-12 flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md p-6">
        <CardContent className="flex flex-col items-center gap-6">
          {status === 'pending' && (
            <>
              <div className="relative">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <ShoppingBag className="h-8 w-8 absolute top-4 left-4 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Verifying Payment</h2>
                <p className="text-muted-foreground">
                  Please wait while we confirm your payment details
                </p>
              </div>
              <Progress value={progress} className="w-full h-2" />
            </>
          )}

          {status === 'success' && (
            <>
              <div className="rounded-full bg-green-100 p-4">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Payment Successful!</h2>
                <p className="text-muted-foreground">{message}</p>
                <p className="text-sm text-muted-foreground">
                  You'll receive a confirmation email shortly
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => router.push('/account/orders')}
                >
                  View Orders
                </Button>
              </div>
            </>
          )}

          {status === 'failed' && (
            <>
              <div className="rounded-full bg-red-100 p-4">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Payment Failed</h2>
                <p className="text-muted-foreground">{message}</p>
                <p className="text-sm text-muted-foreground">
                  Please try again or contact support
                </p>
              </div>
              <div className="flex gap-4 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push('/')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => router.push('/checkout')}
                >
                  Retry Payment
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}