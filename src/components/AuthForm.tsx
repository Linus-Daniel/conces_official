"use client";
import { ChangeEvent, FormEvent, useState, useCallback, useMemo } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaUserTag,
  FaLock,
  FaEye,
  FaChevronDown,
  FaGoogle,
  FaMicrosoft,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaQuestionCircle,
} from "react-icons/fa";
import { FaBuildingColumns } from "react-icons/fa6";
import { useSearchParams, useRouter } from "next/navigation";
import useAuthStore from "@/zustand/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/axiosInstance";

interface IChapter {
  _id: string;
  chapterName: string;
  chapterLocation: string;
  motto: string;
  socialLinks?: { name: string; url: string }[];
  banner: string;
  createdAt: Date;
  updatedAt: Date;
}

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onResend: () => void;
  isResending: boolean;
}

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
  isLoading: boolean;
}

// Optimized Email Verification Modal
const EmailVerificationModal = ({
  isOpen,
  onClose,
  email,
  onResend,
  isResending,
}: EmailVerificationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Check Your Email</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-green-600 text-2xl" />
          </div>
          <p className="text-gray-600 mb-2">
            We've sent a verification link to:
          </p>
          <p className="font-semibold text-gray-900 mb-4">{email}</p>
          <p className="text-sm text-gray-500">
            Click the link in your email to verify your account and complete
            registration.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onResend}
            disabled={isResending}
            className="w-full bg-conces-blue hover:bg-gold-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isResending ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Resending...
              </>
            ) : (
              "Resend Verification Email"
            )}
          </button>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-start">
            <FaExclamationTriangle className="text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium">Can't find the email?</p>
              <p>
                Check your spam folder or try resending the verification email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Optimized Forgot Password Modal
const ForgotPasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: ForgotPasswordModalProps) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      if (!email.trim()) {
        setEmailError("Email is required");
        return;
      }

      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email address");
        return;
      }

      setEmailError("");
      onSubmit(email);
    },
    [email, emailRegex, onSubmit]
  );

  const handleEmailChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (emailError) setEmailError("");
    },
    [emailError]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">Reset Password</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 text-sm">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                className={`pl-10 w-full rounded-md border ${
                  emailError ? "border-red-300" : "border-gray-300"
                } py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary`}
                placeholder="your@email.com"
                required
              />
            </div>
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-primary-dark hover:bg-primary text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Sending Reset Link...
                </>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Password Strength Component
const PasswordStrength = ({ password }: { password: string }) => {
  const strength = useMemo(() => {
    if (password.length === 0) return "";

    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return "weak";
    if (score <= 4) return "medium";
    return "strong";
  }, [password]);

  const getColor = () => {
    switch (strength) {
      case "weak":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "strong":
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  const getText = () => {
    switch (strength) {
      case "weak":
        return "Weak";
      case "medium":
        return "Medium";
      case "strong":
        return "Strong";
      default:
        return "";
    }
  };

  if (!strength) return null;

  return (
    <div className="mt-1">
      <div className="flex items-center mt-1 gap-1">
        <div
          className={`h-1 w-1/4 rounded-full ${
            strength === "weak" ? "bg-red-500" : "bg-royal-200"
          }`}
        />
        <div
          className={`h-1 w-1/4 rounded-full ${
            strength === "medium" || strength === "strong"
              ? "bg-yellow-500"
              : "bg-royal-200"
          }`}
        />
        <div
          className={`h-1 w-1/4 rounded-full ${
            strength === "strong" ? "bg-green-500" : "bg-royal-200"
          }`}
        />
        <div className="h-1 w-1/4 bg-royal-200 rounded-full" />
      </div>
      <p className="text-xs text-royal-500 mt-1">
        Password strength: {getText()}
      </p>
    </div>
  );
};

// Chapter Help Component
const ChapterHelp = () => {
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/contact-us?subject=chapter");
  };

  return (
    <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
      <div className="flex items-start">
        <FaQuestionCircle className="text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
        <div className="text-sm">
          <p className="font-medium text-blue-800 mb-1">Chapter not listed?</p>
          <p className="text-blue-700 mb-2">
            Can't find your chapter in our list? We'd be happy to add it.
          </p>
          <button
            onClick={handleContactClick}
            className="text-gold-600 hover:text-gold-700 font-medium underline hover:no-underline transition-all"
          >
            Contact us to add your chapter
          </button>
        </div>
      </div>
    </div>
  );
};

const AuthForm = ({ chapters = [] }: { chapters?: IChapter[] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const mode = searchParams.get("mode");
  const initialTab = mode === "login" ? "login" : "signup";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Modal states
  const [showEmailVerificationModal, setShowEmailVerificationModal] =
    useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const [isResending, setIsResending] = useState(false);

  const { register, login } = useAuthStore();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    institution: "",
    role: "student",
    password: "",
    confirmPassword: "",
    terms: false,
    chapter: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Memoized validation regexes
  const emailRegex = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
  const phoneRegex = useMemo(() => /^\+?[0-9\s\-]+$/, []);

  // Validate signup form
  const validateSignupForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullname.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.chapter) newErrors.chapter = "Please select a chapter";
    if (!formData.terms)
      newErrors.terms = "You must agree to the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, emailRegex, phoneRegex]);

  // Validate login form
  const validateLoginForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!loginFormData.email.trim()) {
      newErrors.loginEmail = "Email is required";
    } else if (!emailRegex.test(loginFormData.email)) {
      newErrors.loginEmail = "Please enter a valid email address";
    }
    if (!loginFormData.password)
      newErrors.loginPassword = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [loginFormData, emailRegex]);

  // Handle signup submission
  const handleSignupSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!validateSignupForm()) return;

      setIsLoading(true);
      setErrors({});

      try {
        const userData = {
          fullName: formData.fullname,
          email: formData.email,
          phone: formData.phone,
          institution: formData.institution,
          role: formData.role,
          password: formData.password,
          chapter: formData.chapter,
        };

        await register(userData);
        setVerificationEmail(formData.email);
        setShowEmailVerificationModal(true);

        // Reset form
        setFormData({
          fullname: "",
          email: "",
          phone: "",
          institution: "",
          role: "student",
          password: "",
          confirmPassword: "",
          terms: false,
          chapter: "",
        });

        toast.success(
          "Registration successful! Please check your email to verify your account."
        );
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Registration failed";
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [formData, validateSignupForm, register]
  );

  // Handle resend verification
  const handleResendVerification = useCallback(async () => {
    setIsResending(true);

    try {
      await api.post("/api/resend-verification", { email: verificationEmail });
      toast.success("Verification email resent successfully!");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to resend verification email";
      toast.error(errorMessage);
    } finally {
      setIsResending(false);
    }
  }, [verificationEmail]);

  // Handle forgot password
  const handleForgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);

    try {
      await api.post("/api/forgot-password", { email });
      toast.success("Password reset link sent to your email!");
      setShowForgotPasswordModal(false);
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to send reset link";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
    setErrors({});
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox" && e.target instanceof HTMLInputElement
            ? e.target.checked
            : value,
      }));

      // Clear error when user types
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[name];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleLoginInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;

      setLoginFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));

      // Clear error when user types
      const errorKey = `login${name.charAt(0).toUpperCase() + name.slice(1)}`;
      if (errors[errorKey]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[errorKey];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleLoginSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (!validateLoginForm()) return;

      setIsLoading(true);

      try {
        const role = (await login(
          loginFormData.email,
          loginFormData.password
        )) as unknown as string;

        toast.success("Login successful!");

        // Redirect based on role
        switch (role) {
          case "admin":
            router.push("/admin");
            break;
          case "chapter-admin":
            router.push("/chapter");
            break;
          case "alumni":
            router.push("/alumni/dashboard");
            break;
          case "student":
            router.push("/user");
            break;
          default:
            toast.warn("Unrecognized role, redirecting to home");
            router.push("/");
        }
      } catch (error) {
        toast.error("Invalid email or password");
      } finally {
        setIsLoading(false);
      }
    },
    [loginFormData, validateLoginForm, login, router]
  );

  // Memoized chapter options
  const chapterOptions = useMemo(() => {
    return chapters.map((chapter) => (
      <option key={chapter._id} value={chapter._id}>
        {chapter.chapterName} - {chapter.chapterLocation}
      </option>
    ));
  }, [chapters]);

  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      {/* Modals */}
      <EmailVerificationModal
        isOpen={showEmailVerificationModal}
        onClose={() => setShowEmailVerificationModal(false)}
        email={verificationEmail}
        onResend={handleResendVerification}
        isResending={isResending}
      />

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        onClose={() => setShowForgotPasswordModal(false)}
        onSubmit={handleForgotPassword}
        isLoading={isLoading}
      />

      {/* Authentication Flow Tabs */}
      <div className="w-full max-w-4xl mx-auto pt-8 px-4">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg shadow p-1">
            <button
              onClick={() => handleTabChange("signup")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === "signup"
                  ? "bg-conces-blue text-white font-medium"
                  : "text-royal-700 bg-slate-200 font-medium hover:bg-royal-100"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => handleTabChange("login")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === "login"
                  ? "bg-conces-blue text-white font-medium"
                  : "text-royal-700 font-medium bg-slate-200 hover:bg-royal-100"
              }`}
            >
              Log In
            </button>
          </div>
        </div>

        {/* Authentication Forms Container */}
        <div className="w-full">
          {/* Signup Form */}
          {activeTab === "signup" && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-conces-blue">
                  Create Your Account
                </h2>
                <p className="text-royal-500 mt-2">
                  Join our community and access role-specific features
                </p>
              </div>

              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-royal-700 mb-1"
                      htmlFor="fullname"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                        <FaUser />
                      </div>
                      <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        className={`pl-10 w-full rounded-md border ${
                          errors.fullname
                            ? "border-red-300"
                            : "border-royal-300"
                        } py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500`}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    {errors.fullname && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.fullname}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-medium text-royal-700 mb-1"
                      htmlFor="email"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                        <FaEnvelope />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`pl-10 w-full rounded-md border ${
                          errors.email ? "border-red-300" : "border-royal-300"
                        } py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500`}
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      className="block text-sm font-medium text-royal-700 mb-1"
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                        <FaPhone />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`pl-10 w-full rounded-md border ${
                          errors.phone ? "border-red-300" : "border-royal-300"
                        } py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500`}
                        placeholder="+234 123 456 7890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Institution */}
                  <div>
                    <label
                      className="block text-sm font-medium text-royal-700 mb-1"
                      htmlFor="institution"
                    >
                      Institution
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                        <FaBuildingColumns />
                      </div>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="Institution Name"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label
                      className="block text-sm font-medium text-royal-700 mb-1"
                      htmlFor="role"
                    >
                      Select Your Role <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                        <FaUserTag />
                      </div>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 appearance-none"
                      >
                        <option value="student">Student</option>
                        <option value="alumni">Alumni</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-royal-400">
                        <FaChevronDown />
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-royal-500 italic">
                      <p>
                        As a Student, you'll have access to courses, events,
                        mentorship, and devotionals.
                      </p>
                    </div>
                  </div>

                  {/* Chapter */}
                  <div>
                    <label
                      className="block text-sm font-medium text-royal-700 mb-1"
                      htmlFor="chapter"
                    >
                      Select Your Chapter{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                        <FaBuildingColumns />
                      </div>
                      <select
                        id="chapter"
                        name="chapter"
                        value={formData.chapter}
                        onChange={handleInputChange}
                        className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500 appearance-none"
                        required
                      >
                        <option value="">Select a chapter</option>
                        {chapterOptions}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-royal-400">
                        <FaChevronDown />
                      </div>
                    </div>
                    {errors.chapter && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.chapter}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Password */}
                  <div>
                    <label
                      className="block text-sm font-medium text-royal-700 mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                        <FaLock />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-10 w-full rounded-md border ${
                          errors.password
                            ? "border-red-300"
                            : "border-royal-300"
                        } py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-royal-400 hover:text-royal-600"
                      >
                        <FaEye />
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                    <PasswordStrength password={formData.password} />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      className="block text-sm font-medium text-royal-700 mb-1"
                      htmlFor="confirm-password"
                    >
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                        <FaLock />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirm-password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-10 w-full rounded-md border ${
                          errors.confirmPassword
                            ? "border-red-300"
                            : "border-royal-300"
                        } py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500`}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-royal-400 hover:text-royal-600"
                      >
                        <FaEye />
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>
                <ChapterHelp />

                {/* Terms and conditions */}
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="terms"
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className={`h-4 w-4 text-gold-600 ${
                        errors.terms ? "border-red-300" : "border-royal-300"
                      } rounded focus:ring-gold-500`}
                    />
                    <label
                      htmlFor="terms"
                      className="ml-2 block text-sm text-royal-800"
                    >
                      I agree to the{" "}
                    
                      <span className="text-gold-600 hover:text-gold-700 font-medium cursor-pointer">
                        Privacy Policy
                      </span>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>

                <div>
                  <button
                    onClick={handleSignupSubmit}
                    disabled={isLoading}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Login Form */}
          {activeTab === "login" && (
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-conces-blue">
                  Welcome Back
                </h2>
                <p className="text-royal-500 mt-2">
                  Log in to access your dashboard
                </p>
              </div>

              <div>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-royal-700 mb-1"
                    htmlFor="login-email"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      id="login-email"
                      name="email"
                      value={loginFormData.email}
                      onChange={handleLoginInputChange}
                      className={`pl-10 w-full rounded-md border ${
                        errors.loginEmail
                          ? "border-red-300"
                          : "border-royal-300"
                      } py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500`}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  {errors.loginEmail && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.loginEmail}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <label
                      className="block text-sm font-medium text-royal-700"
                      htmlFor="login-password"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPasswordModal(true)}
                      className="text-sm text-gold-600 hover:text-gold-700 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-royal-400">
                      <FaLock />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      id="login-password"
                      name="password"
                      value={loginFormData.password}
                      onChange={handleLoginInputChange}
                      className={`pl-10 w-full rounded-md border ${
                        errors.loginPassword
                          ? "border-red-300"
                          : "border-royal-300"
                      } py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500`}
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-royal-400 hover:text-royal-600"
                    >
                      <FaEye />
                    </button>
                  </div>
                  {errors.loginPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.loginPassword}
                    </p>
                  )}
                </div>

                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      name="rememberMe"
                      checked={loginFormData.rememberMe}
                      onChange={handleLoginInputChange}
                      className="h-4 w-4 text-gold-600 border-royal-300 rounded focus:ring-gold-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-royal-800"
                    >
                      Remember me on this device
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    onClick={handleLoginSubmit}
                    disabled={isLoading}
                    className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Logging In...
                      </>
                    ) : (
                      "Log In"
                    )}
                  </button>
                </div>

                {/* <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-royal-300 absolute w-full"></div>
                  <div className="bg-white px-4 relative z-10 text-sm text-royal-500">
                    Or continue with
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center py-2 px-4 border border-royal-300 rounded-md shadow-sm bg-white text-royal-800 hover:bg-gray-50 transition-colors"
                  >
                    <FaGoogle className="text-red-500 mr-2" />
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center py-2 px-4 border border-royal-300 rounded-md shadow-sm bg-white text-royal-800 hover:bg-gray-50 transition-colors"
                  >
                    <FaMicrosoft className="text-blue-500 mr-2" />
                    Microsoft
                  </button>
                </div> */}

                <p className="text-center text-sm text-royal-600">
                  Don't have an account?{" "}
                  <span
                    className="text-gold-600 hover:text-gold-700 font-medium cursor-pointer"
                    onClick={() => handleTabChange("signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-royal-500">
            © 2025 CONCES. All rights reserved.
          </p>
          <div className="mt-2 space-x-4">
            <span className="text-gold-600 hover:text-gold-700 cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-gold-600 hover:text-gold-700 cursor-pointer">
              Terms of Service
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthForm;
