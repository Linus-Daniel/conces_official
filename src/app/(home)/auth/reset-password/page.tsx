"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaEye, FaEyeSlash, FaLock, FaSpinner } from "react-icons/fa";

interface ResetState {
  loading: boolean;
  tokenValid: boolean;
  error: string | null;
  success: boolean;
  expired: boolean;
  userInfo: { fullName: string; email: string } | null;
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [state, setState] = useState<ResetState>({
    loading: true,
    tokenValid: false,
    error: null,
    success: false,
    expired: false,
    userInfo: null,
  });

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!token) {
      setState({
        loading: false,
        tokenValid: false,
        error: "Invalid reset link",
        success: false,
        expired: false,
        userInfo: null,
      });
      return;
    }

    validateToken(token);
  }, [token]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/reset-password?token=${token}`);
      const data = await response.json();

      if (response.ok && data.valid) {
        setState({
          loading: false,
          tokenValid: true,
          error: null,
          success: false,
          expired: false,
          userInfo: data.user,
        });
      } else {
        setState({
          loading: false,
          tokenValid: false,
          error: data.message,
          success: false,
          expired: data.expired || false,
          userInfo: null,
        });
      }
    } catch (error) {
      setState({
        loading: false,
        tokenValid: false,
        error: "Network error. Please try again.",
        success: false,
        expired: false,
        userInfo: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setState(prev => ({
          ...prev,
          success: true,
          error: null,
        }));

        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth?mode=login&reset=success");
        }, 3000);
      } else {
        setState(prev => ({
          ...prev,
          error: data.message,
          expired: data.expired || false,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: "Network error. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          {state.loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Validating reset link...</p>
            </div>
          )}

          {!state.loading && state.success && (
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
                Password Reset Successful!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Your password has been reset successfully. You can now log in with your new password.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Redirecting to login in 3 seconds...
              </p>
              <div className="mt-4">
                <Link
                  href="/auth?mode=login"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go to Login
                </Link>
              </div>
            </div>
          )}

          {!state.loading && state.tokenValid && !state.success && (
            <div>
              <div className="text-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Create New Password
                </h3>
                {state.userInfo && (
                  <p className="mt-1 text-sm text-gray-600">
                    for {state.userInfo.fullName} ({state.userInfo.email})
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <FaLock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`pl-10 w-full rounded-md border ${
                        errors.password ? "border-red-300" : "border-gray-300"
                      } py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Enter new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                      <FaLock />
                    </div>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`pl-10 w-full rounded-md border ${
                        errors.confirmPassword ? "border-red-300" : "border-gray-300"
                      } py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      placeholder="Confirm new password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Resetting Password...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </form>
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
                Reset Failed
              </h3>
              <p className="mt-2 text-sm text-gray-600">{state.error}</p>

              {state.expired && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-gray-500">
                    Your reset link has expired.
                  </p>
                  <Link
                    href="/auth?mode=login"
                    className="inline-flex items-center text-blue-600 hover:text-blue-500 text-sm"
                  >
                    Request a new reset link
                  </Link>
                </div>
              )}

              <div className="mt-4">
                <Link
                  href="/auth?mode=login"
                  className="text-blue-600 hover:text-blue-500 text-sm"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}