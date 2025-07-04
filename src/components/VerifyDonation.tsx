"use client";
export const dynamic = "force-dynamic"; // Required to fix Next.js build error with browser-only logic

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import api from "@/lib/axiosInstance";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { format } from "date-fns";

type DonationStatus = "pending" | "success" | "failed";

interface DonationDetails {
  amount: number;
  reference: string;
  donorName: string;
  email: string;
  date: string;
  anonymous: boolean;
}

export default function DonationVerification() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<DonationStatus>("pending");
  const [donation, setDonation] = useState<DonationDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyDonation = async () => {
      try {
        const reference = searchParams.get("reference");
        const trxref = searchParams.get("trxref");

        if (!reference || !trxref) {
          throw new Error("Invalid verification parameters");
        }

        const response = await api.post(`/donation/verify`, { reference });

        setDonation({
          amount: response.data.amount / 100,
          reference: response.data.reference,
          donorName: response.data.donorName,
          email: response.data.email,
          date: response.data.paidAt,
          anonymous: response.data.anonymous,
        });

        setStatus("success");
      } catch (error) {
        console.error("Verification failed:", error);
        setStatus("failed");
      } finally {
        setLoading(false);
      }
    };

    verifyDonation();
  }, [searchParams]);

  const renderStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-16 w-16 text-green-500" />;
      case "failed":
        return <XCircle className="h-16 w-16 text-red-500" />;
      default:
        return <Loader2 className="h-16 w-16 animate-spin text-blue-500" />;
    }
  };

  const renderStatusMessage = () => {
    switch (status) {
      case "success":
        return (
          <>
            <h2 className="text-2xl font-bold text-green-600">
              Donation Successful!
            </h2>
            <p className="text-muted-foreground">
              Thank you for your generous support.
            </p>
          </>
        );
      case "failed":
        return (
          <>
            <h2 className="text-2xl font-bold text-red-600">Donation Failed</h2>
            <p className="text-muted-foreground">
              We couldn't process your donation. Please try again.
            </p>
          </>
        );
      default:
        return (
          <>
            <h2 className="text-2xl font-bold">Verifying Donation</h2>
            <p className="text-muted-foreground">
              Please wait while we verify your transaction...
            </p>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-royal-50 to-royal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            {renderStatusIcon()}
            <div className="mt-4 space-y-2">{renderStatusMessage()}</div>
          </CardHeader>

          {donation && status === "success" && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium">
                    ₦{donation.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {format(new Date(donation.date), "MMM d, yyyy h:mm a")}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Donor</p>
                <p className="font-medium">
                  {donation.anonymous ? "Anonymous" : donation.donorName}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">
                  Transaction Reference
                </p>
                <p className="font-mono text-sm">{donation.reference}</p>
              </div>
            </CardContent>
          )}

          <CardFooter className="flex flex-col space-y-3">
            {status === "success" && (
              <>
                <Button className="w-full" onClick={() => window.print()}>
                  Print Receipt
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  A receipt has been sent to {donation?.email || "your email"}
                </p>
              </>
            )}

            {status === "failed" && (
              <Button
                className="w-full"
                onClick={() => (window.location.href = "/donate")}
              >
                Try Again
              </Button>
            )}

            <Button variant="outline" className="w-full" asChild>
              <a href="/">Return Home</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
