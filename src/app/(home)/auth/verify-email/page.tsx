// app/verify-email/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

interface VerificationState {
  loading: boolean;
  verified: boolean;
  error: string | null;
  message: string;
  alreadyVerified: boolean;
  expired: boolean;
}

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [state, setState] = useState<VerificationState>({
    loading: true,
    verified: false,
    error: null,
    message: "",
    alreadyVerified: false,
    expired: false,
  });

  useEffect(() => {
    if (!token) {
      setState({
        loading: false,
        verified: false,
        error: "Invalid verification link",
        message: "No verification token provided.",
        alreadyVerified: false,
        expired: false,
      });
      return;
    }

    verifyEmail(token);
  }, [token]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/verify-email?token=${token}`, {
        method: "GET",
      });

      const data = await response.json();

      if (response.ok) {
        setState({
          loading: false,
          verified: true,
          error: null,
          message: data.message,
          alreadyVerified: data.alreadyVerified || false,
          expired: false,
        });

        // Redirect to login after a short delay
        if (!data.alreadyVerified) {
          setTimeout(() => {
            router.push("/login?verified=true");
          }, 3000);
        }
      } else {
        setState({
          loading: false,
          verified: false,
          error: data.message,
          message: "",
          alreadyVerified: false,
          expired: data.expired || false,
        });
      }
    } catch (error) {
      setState({
        loading: false,
        verified: false,
        error: "Network error. Please try again.",
        message: "",
        alreadyVerified: false,
        expired: false,
      });
    }
  };

  const resendVerification = async () => {
    // You might want to implement a resend verification endpoint
    // For now, redirect to registration
    router.push("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {state.loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Verifying your email...</p>
            </div>
          )}

          {!state.loading && state.verified && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {state.alreadyVerified ? "Already Verified" : "Email Verified!"}
              </h3>
              <p className="mt-2 text-sm text-gray-600">{state.message}</p>
              {!state.alreadyVerified && (
                <p className="mt-2 text-xs text-gray-500">
                  Redirecting to login in 3 seconds...
                </p>
              )}
              <div className="mt-4">
                <Link
                  href="/login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {!state.loading && state.error && (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Verification Failed
              </h3>
              <p className="mt-2 text-sm text-gray-600">{state.error}</p>

              {state.expired && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500">
                    Your verification link has expired.
                  </p>
                  <button
                    onClick={resendVerification}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Request New Verification Link
                  </button>
                </div>
              )}

              <div className="mt-4">
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-500 text-sm"
                >
                  Back to Registration
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
