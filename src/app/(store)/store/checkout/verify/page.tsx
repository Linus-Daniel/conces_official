import PaymentVerificationPage from "@/components/VerifyPayment";
import { Suspense } from "react";


export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentVerificationPage />
    </Suspense>
  );
}
