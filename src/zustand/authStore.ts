import { create } from "zustand";
import { getSession, signIn, signOut } from "next-auth/react";
import api from "@/lib/axiosInstance";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  emailVerified?: boolean;
  phone?: string;
  institution?: string;
  chapter?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  verificationStep: "initial" | "verification" | "complete";
  verificationId: string | null;
  login: (email: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  register: (data: {
    fullName: string;
    email: string;
    phone?: string;
    institution?: string;
    role: string;
    password: string;
    chapter?: string;
  }) => Promise<void>;
  verifyEmail: (
    verificationCode: string,
    userData: {
      fullName: string;
      email: string;
      phone?: string;
      institution?: string;
      role: string;
      password: string;
      chapter?: string;
    },
    verificationId: string
  ) => Promise<void>;
  resendVerification: (userData: {
    fullName: string;
    email: string;
    phone?: string;
    institution?: string;
    role: string;
    password: string;
    chapter?: string;
  }) => Promise<void>;
  checkAuthStatus: () => Promise<void>;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  verificationStep: "initial",
  verificationId: null,

  login: async (email: string, password: string) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        throw new Error(res.error);
      }

      const session = await getSession();
      if (!session || !session.user) {
        throw new Error("Session not found");
      }

      const user = session.user as User;

      set({
        isAuthenticated: true,
        user,
      });

      return user.role; // So component can redirect based on role
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      await signOut({ redirect: false });
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        verificationStep: "initial",
        verificationId: null,
      });

      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear local state even if signOut fails
      set({
        isAuthenticated: false,
        user: null,
        token: null,
        verificationStep: "initial",
        verificationId: null,
      });
    }
  },

  register: async ({
    fullName,
    email,
    phone,
    institution,
    role,
    password,
    chapter,
  }) => {
    console.log("🚀 [AUTH STORE] Starting registration process");
    console.log("📝 [AUTH STORE] Registration data:", {
      fullName,
      email,
      phone: phone || "undefined",
      institution: institution || "undefined",
      role,
      password: password ? "***HIDDEN***" : "undefined",
      chapter: chapter || "undefined",
    });

    try {
      console.log("📡 [AUTH STORE] Preparing API request to /auth/register");

      const requestPayload = {
        fullName,
        email,
        phone,
        institution,
        role,
        password,
        chapter,
      };

      console.log("📦 [AUTH STORE] Request payload:", {
        ...requestPayload,
        password: "***HIDDEN***",
      });

      console.log("🔄 [AUTH STORE] Making API call...");
      const res = await api.post("/auth/register", requestPayload);

      console.log("✅ [AUTH STORE] API call successful");
      console.log("📄 [AUTH STORE] Response status:", res.status);
      console.log("📄 [AUTH STORE] Response headers:", res.headers);

      const data = res.data;
      console.log("📊 [AUTH STORE] Response data:", data);

      if (data.requiresVerification) {
        console.log("📧 [AUTH STORE] Email verification required");
        console.log("🔑 [AUTH STORE] Verification ID:", data.verificationId);
        console.log(
          "⏰ [AUTH STORE] Expires at:",
          data.expiresAt
            ? new Date(data.expiresAt).toISOString()
            : "Not provided"
        );

        set({
          verificationStep: "verification",
          verificationId: data.verificationId,
        });

        console.log("✅ [AUTH STORE] State updated for verification step");
        return;
      }

      // If verification not required (admin bypass)
      if (data.user) {
        console.log("👑 [AUTH STORE] Admin bypass - no verification required");
        console.log("👤 [AUTH STORE] User created:", {
          id: data.user.id,
          email: data.user.email,
          role: data.user.role,
          chapter: data.user.chapter || "undefined",
        });

        set({
          verificationStep: "complete",
        });

        console.log("✅ [AUTH STORE] Registration completed successfully");
        return;
      }

      console.log(
        "❌ [AUTH STORE] Unexpected response - no verification required and no user data"
      );
      console.log(
        "📊 [AUTH STORE] Full response data:",
        JSON.stringify(data, null, 2)
      );
      throw new Error(
        data.message || "Registration failed - unexpected response format"
      );
    } catch (error: any) {
      console.log("💥 [AUTH STORE] Registration error caught");
      console.log("🔍 [AUTH STORE] Error type:", typeof error);
      console.log("🔍 [AUTH STORE] Error name:", error.name);
      console.log("🔍 [AUTH STORE] Error message:", error.message);
      console.log("🔍 [AUTH STORE] Error stack:", error.stack);

      // Check if it's a network/axios error
      if (error.response) {
        console.log("🌐 [AUTH STORE] HTTP Error Response detected");
        console.log("📄 [AUTH STORE] Status code:", error.response.status);
        console.log("📄 [AUTH STORE] Status text:", error.response.statusText);
        console.log(
          "📄 [AUTH STORE] Response headers:",
          error.response.headers
        );
        console.log("📊 [AUTH STORE] Response data:", error.response.data);

        // Handle different error types
        if (error.response?.data?.errors) {
          console.log("🚨 [AUTH STORE] Zod validation errors detected");
          console.log(
            "📝 [AUTH STORE] Validation errors:",
            error.response.data.errors
          );

          const validationErrors = error.response.data.errors
            .map((err: any) => {
              console.log(
                `❌ [AUTH STORE] Validation error - Field: ${err.field}, Message: ${err.message}`
              );
              return `${err.field}: ${err.message}`;
            })
            .join(", ");

          console.log(
            "📝 [AUTH STORE] Combined validation errors:",
            validationErrors
          );
          throw new Error(`Validation Error: ${validationErrors}`);
        }

        const errorMessage =
          error.response?.data?.message || "HTTP Error occurred";
        console.log("📝 [AUTH STORE] Final error message:", errorMessage);
        throw new Error(errorMessage);
      } else if (error.request) {
        console.log("🌐 [AUTH STORE] Network error - no response received");
        console.log("📡 [AUTH STORE] Request details:", error.request);
        throw new Error(
          "Network Error: Unable to reach server. Please check your internet connection."
        );
      } else if (error.code === "ECONNREFUSED") {
        console.log("🔌 [AUTH STORE] Connection refused error");
        throw new Error(
          "Connection Error: Server is not responding. Please try again later."
        );
      } else if (error instanceof SyntaxError) {
        console.log("🔤 [AUTH STORE] Syntax error detected");
        console.log("📝 [AUTH STORE] Syntax error details:", error.message);
        throw new Error(`Syntax Error: ${error.message}`);
      } else if (error instanceof TypeError) {
        console.log("🔧 [AUTH STORE] Type error detected");
        console.log("📝 [AUTH STORE] Type error details:", error.message);
        throw new Error(`Type Error: ${error.message}`);
      } else if (error instanceof ReferenceError) {
        console.log("🔗 [AUTH STORE] Reference error detected");
        console.log("📝 [AUTH STORE] Reference error details:", error.message);
        throw new Error(`Reference Error: ${error.message}`);
      } else {
        console.log("❓ [AUTH STORE] Unknown error type");
        console.log("🔍 [AUTH STORE] Error object:", error);
        console.log(
          "🔍 [AUTH STORE] Error JSON:",
          JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
        );

        const errorMessage =
          error.message || "Unknown error occurred during registration";
        console.log(
          "📝 [AUTH STORE] Final unknown error message:",
          errorMessage
        );
        throw new Error(`Unknown Error: ${errorMessage}`);
      }
    }
  },

  verifyEmail: async (verificationCode, userData, verificationId) => {
    console.log("🔐 [AUTH STORE] Starting email verification process");
    console.log("📝 [AUTH STORE] Verification data:", {
      verificationCode: verificationCode || "undefined",
      verificationId: verificationId || "undefined",
      userData: {
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone || "undefined",
        institution: userData.institution || "undefined",
        role: userData.role,
        password: userData.password ? "***HIDDEN***" : "undefined",
        chapter: userData.chapter || "undefined",
      },
    });

    try {
      console.log(
        "📡 [AUTH STORE] Preparing verification API request to /auth/register"
      );

      const requestPayload = {
        verificationCode,
        verificationId,
        ...userData,
      };

      console.log("📦 [AUTH STORE] Verification request payload:", {
        ...requestPayload,
        password: "***HIDDEN***",
      });

      console.log("🔄 [AUTH STORE] Making verification API call...");
      const res = await api.post("/auth/register", requestPayload);

      console.log("✅ [AUTH STORE] Verification API call successful");
      console.log("📄 [AUTH STORE] Verification response status:", res.status);
      console.log(
        "📄 [AUTH STORE] Verification response headers:",
        res.headers
      );

      const data = res.data;
      console.log("📊 [AUTH STORE] Verification response data:", data);

      // Registration completed successfully
      console.log("🎉 [AUTH STORE] Email verification completed successfully");
      set({
        verificationStep: "complete",
        verificationId: null,
      });

      console.log(
        "✅ [AUTH STORE] Verification state updated - user can now login"
      );
      return;
    } catch (error: any) {
      console.log("💥 [AUTH STORE] Email verification error caught");
      console.log("🔍 [AUTH STORE] Verification error type:", typeof error);
      console.log("🔍 [AUTH STORE] Verification error name:", error.name);
      console.log("🔍 [AUTH STORE] Verification error message:", error.message);
      console.log("🔍 [AUTH STORE] Verification error stack:", error.stack);

      // Check if it's a network/axios error
      if (error.response) {
        console.log(
          "🌐 [AUTH STORE] Verification HTTP Error Response detected"
        );
        console.log(
          "📄 [AUTH STORE] Verification status code:",
          error.response.status
        );
        console.log(
          "📄 [AUTH STORE] Verification status text:",
          error.response.statusText
        );
        console.log(
          "📄 [AUTH STORE] Verification response headers:",
          error.response.headers
        );
        console.log(
          "📊 [AUTH STORE] Verification response data:",
          error.response.data
        );

        // Handle different error types
        if (error.response?.data?.errors) {
          console.log(
            "🚨 [AUTH STORE] Verification Zod validation errors detected"
          );
          console.log(
            "📝 [AUTH STORE] Verification validation errors:",
            error.response.data.errors
          );

          const validationErrors = error.response.data.errors
            .map((err: any) => {
              console.log(
                `❌ [AUTH STORE] Verification validation error - Field: ${err.field}, Message: ${err.message}`
              );
              return `${err.field}: ${err.message}`;
            })
            .join(", ");

          console.log(
            "📝 [AUTH STORE] Combined verification validation errors:",
            validationErrors
          );
          throw new Error(`Verification Validation Error: ${validationErrors}`);
        }

        const errorMessage =
          error.response?.data?.message || "Verification HTTP Error occurred";
        console.log(
          "📝 [AUTH STORE] Final verification error message:",
          errorMessage
        );
        throw new Error(errorMessage);
      } else if (error.request) {
        console.log(
          "🌐 [AUTH STORE] Verification network error - no response received"
        );
        console.log(
          "📡 [AUTH STORE] Verification request details:",
          error.request
        );
        throw new Error(
          "Verification Network Error: Unable to reach server. Please check your internet connection."
        );
      } else if (error instanceof SyntaxError) {
        console.log("🔤 [AUTH STORE] Verification syntax error detected");
        console.log(
          "📝 [AUTH STORE] Verification syntax error details:",
          error.message
        );
        throw new Error(`Verification Syntax Error: ${error.message}`);
      } else {
        console.log("❓ [AUTH STORE] Unknown verification error type");
        console.log("🔍 [AUTH STORE] Verification error object:", error);
        console.log(
          "🔍 [AUTH STORE] Verification error JSON:",
          JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
        );

        const errorMessage =
          error.message || "Unknown error occurred during verification";
        console.log(
          "📝 [AUTH STORE] Final unknown verification error message:",
          errorMessage
        );
        throw new Error(`Verification Unknown Error: ${errorMessage}`);
      }
    }
  },

  resendVerification: async (userData) => {
    console.log("🔄 [AUTH STORE] Starting resend verification process");
    console.log("📝 [AUTH STORE] Resend verification data:", {
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone || "undefined",
      institution: userData.institution || "undefined",
      role: userData.role,
      password: userData.password ? "***HIDDEN***" : "undefined",
      chapter: userData.chapter || "undefined",
    });

    try {
      console.log(
        "📡 [AUTH STORE] Preparing resend verification API request to /auth/register"
      );
      console.log("📦 [AUTH STORE] Resend verification request payload:", {
        ...userData,
        password: "***HIDDEN***",
      });

      console.log("🔄 [AUTH STORE] Making resend verification API call...");
      const res = await api.post("/auth/register", userData);

      console.log("✅ [AUTH STORE] Resend verification API call successful");
      console.log(
        "📄 [AUTH STORE] Resend verification response status:",
        res.status
      );
      console.log(
        "📄 [AUTH STORE] Resend verification response headers:",
        res.headers
      );

      const data = res.data;
      console.log("📊 [AUTH STORE] Resend verification response data:", data);

      if (data.requiresVerification) {
        console.log("📧 [AUTH STORE] New verification email sent successfully");
        console.log(
          "🔑 [AUTH STORE] New verification ID:",
          data.verificationId
        );
        console.log(
          "⏰ [AUTH STORE] New expires at:",
          data.expiresAt
            ? new Date(data.expiresAt).toISOString()
            : "Not provided"
        );

        set({
          verificationStep: "verification",
          verificationId: data.verificationId,
        });

        console.log("✅ [AUTH STORE] Resend verification state updated");
        return;
      }

      console.log(
        "❌ [AUTH STORE] Unexpected resend response - no verification required"
      );
      console.log(
        "📊 [AUTH STORE] Full resend response data:",
        JSON.stringify(data, null, 2)
      );
      throw new Error(
        data.message ||
          "Failed to resend verification - unexpected response format"
      );
    } catch (error: any) {
      console.log("💥 [AUTH STORE] Resend verification error caught");
      console.log("🔍 [AUTH STORE] Resend error type:", typeof error);
      console.log("🔍 [AUTH STORE] Resend error name:", error.name);
      console.log("🔍 [AUTH STORE] Resend error message:", error.message);
      console.log("🔍 [AUTH STORE] Resend error stack:", error.stack);

      // Check if it's a network/axios error
      if (error.response) {
        console.log("🌐 [AUTH STORE] Resend HTTP Error Response detected");
        console.log(
          "📄 [AUTH STORE] Resend status code:",
          error.response.status
        );
        console.log(
          "📄 [AUTH STORE] Resend status text:",
          error.response.statusText
        );
        console.log(
          "📄 [AUTH STORE] Resend response headers:",
          error.response.headers
        );
        console.log(
          "📊 [AUTH STORE] Resend response data:",
          error.response.data
        );

        // Handle different error types
        if (error.response?.data?.errors) {
          console.log("🚨 [AUTH STORE] Resend Zod validation errors detected");
          console.log(
            "📝 [AUTH STORE] Resend validation errors:",
            error.response.data.errors
          );

          const validationErrors = error.response.data.errors
            .map((err: any) => {
              console.log(
                `❌ [AUTH STORE] Resend validation error - Field: ${err.field}, Message: ${err.message}`
              );
              return `${err.field}: ${err.message}`;
            })
            .join(", ");

          console.log(
            "📝 [AUTH STORE] Combined resend validation errors:",
            validationErrors
          );
          throw new Error(`Resend Validation Error: ${validationErrors}`);
        }

        const errorMessage =
          error.response?.data?.message || "Resend HTTP Error occurred";
        console.log(
          "📝 [AUTH STORE] Final resend error message:",
          errorMessage
        );
        throw new Error(errorMessage);
      } else if (error.request) {
        console.log(
          "🌐 [AUTH STORE] Resend network error - no response received"
        );
        console.log("📡 [AUTH STORE] Resend request details:", error.request);
        throw new Error(
          "Resend Network Error: Unable to reach server. Please check your internet connection."
        );
      } else if (error instanceof SyntaxError) {
        console.log("🔤 [AUTH STORE] Resend syntax error detected");
        console.log(
          "📝 [AUTH STORE] Resend syntax error details:",
          error.message
        );
        throw new Error(`Resend Syntax Error: ${error.message}`);
      } else {
        console.log("❓ [AUTH STORE] Unknown resend error type");
        console.log("🔍 [AUTH STORE] Resend error object:", error);
        console.log(
          "🔍 [AUTH STORE] Resend error JSON:",
          JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
        );

        const errorMessage =
          error.message || "Unknown error occurred during resend verification";
        console.log(
          "📝 [AUTH STORE] Final unknown resend error message:",
          errorMessage
        );
        throw new Error(`Resend Unknown Error: ${errorMessage}`);
      }
    }
  },

  checkAuthStatus: async () => {
    try {
      const session = await getSession();

      if (session?.user) {
        const user = session.user as User;
        set({
          isAuthenticated: true,
          user,
        });
      } else {
        set({
          isAuthenticated: false,
          user: null,
          token: null,
        });

        // Clear stored token if session is invalid
        if (typeof window !== "undefined") {
          localStorage.removeItem("authToken");
        }
      }
    } catch (error) {
      console.error("Auth check error:", error);
      set({
        isAuthenticated: false,
        user: null,
        token: null,
      });

      if (typeof window !== "undefined") {
        localStorage.removeItem("authToken");
      }
    }
  },

  clearAuth: () => {
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      verificationStep: "initial",
      verificationId: null,
    });

    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
    }
  },
}));

export default useAuthStore;
