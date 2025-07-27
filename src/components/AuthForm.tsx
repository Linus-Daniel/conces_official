"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBuildingColumns,
  FaUserTag,
  FaLock,
  FaEye,
  FaChevronDown,
  FaGoogle,
  FaMicrosoft,
  FaBell,
} from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import useAuthStore from "@/zustand/authStore";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  // Get auth store methods and state
  const {
    register,
    login,
    verifyEmail,
    resendVerification,
    verificationStep,
    verificationId,
  } = useAuthStore();

  const params = useSearchParams();
  const mode = params.get("mode");

  useEffect(() => {
    if (mode === "login") {
      setActiveTab("login");
    } else if (mode === "signup") {
      setActiveTab("signup");
    } else if (mode === "verification") {
      setActiveTab("verification");
    } else if (mode === "alumni-dashboard") {
      setActiveTab("alumni-dashboard");
    } else {
      setActiveTab("signup");
    }
  }, [mode]);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    institution: "",
    role: "student",
    password: "",
    confirmPassword: "",
    terms: false,
    captcha: false,
  });

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Phone validation regex (basic international format)
  const phoneRegex = /^\+?[0-9\s\-]+$/;

  // Handle verification code input
  const handleVerificationCodeChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`verification-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  // Validate form fields
  const validateSignupForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullname.trim()) {
      newErrors.fullname = "Full name is required";
    }

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

    if (!formData.terms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    if (!formData.captcha) {
      newErrors.captcha = "Please verify you're not a robot";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validate login form
  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};

    if (!loginFormData.email.trim()) {
      newErrors.loginEmail = "Email is required";
    } else if (!emailRegex.test(loginFormData.email)) {
      newErrors.loginEmail = "Please enter a valid email address";
    }

    if (!loginFormData.password) {
      newErrors.loginPassword = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle signup submission
  const handleSignupSubmit = async (e: FormEvent) => {
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
      };

      await register(userData);
      toast.success(
        "Registration successful! Please check your email for verification code."
      );
      setActiveTab("verification");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.response.data.message : "Registration failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle verification submission
  const handleVerificationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      if (!verificationId) {
        throw new Error("Verification session expired. Please register again.");
      }

      const code = verificationCode.join("");
      if (code.length !== 6) {
        throw new Error("Please enter a complete 6-digit code");
      }

      const userData = {
        fullName: formData.fullname,
        email: formData.email,
        phone: formData.phone,
        institution: formData.institution,
        role: formData.role,
        password: formData.password,
      };

      await verifyEmail(code, userData, verificationId);
      toast.success("Email verified successfully!");

      if (userData.role === "student") {
        router.push("/student-dashboard");
      } else if (userData.role === "alumni") {
        router.push("/alumni-dashboard");
      }

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
        captcha: false,
      });
      setVerificationCode(["", "", "", "", "", ""]);
    } catch (err) {
      setVerificationCode(["", "", "", "", "", ""]);
      const errorMessage =
        err instanceof Error ? err.message : "Verification failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle resend verification code
  const handleResendVerification = async () => {
    setIsLoading(true);
    setErrors({});

    try {
      await resendVerification(formData.email);
      toast.success("Verification code resent successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to resend code";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setErrors({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const handleLoginInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setLoginFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user types
    if (errors[`login${name.charAt(0).toUpperCase() + name.slice(1)}`]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[
          `login${name.charAt(0).toUpperCase() + name.slice(1)}`
        ];
        return newErrors;
      });
    }
  };

  const calculatePasswordStrength = (password: string) => {
    if (password.length === 0) {
      setPasswordStrength("");
      return;
    }

    let strength = 0;

    // Length check
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;

    // Complexity checks
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 2) {
      setPasswordStrength("weak");
    } else if (strength <= 4) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateLoginForm()) return;

    setIsLoading(true);

    try {
      const userData = {
        email: loginFormData.email,
        password: loginFormData.password,
      };

      const role = (await login(
        userData.email,
        userData.password
      )) as unknown as string;

      toast.success("Login successful!");

      // Redirect based on role
      switch (role) {
        case "admin":
          router.push("/admin");
          break;
        case "branch-admin":
          router.push("/branch");
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
      console.error("Login error:", error);
      toast.error("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
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

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
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

      {/* Authentication Flow Tabs */}
      <div className="w-full max-w-4xl mx-auto mt-8 px-4">
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white rounded-lg shadow p-1">
            <button
              onClick={() => handleTabChange("signup")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === "signup"
                  ? "bg-conces-blue text-white font-medium"
                  : "text-gray-700 bg-slate-200 font-medium hover:bg-gray-100"
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => handleTabChange("login")}
              className={`px-6 py-2 rounded-md transition-all ${
                activeTab === "login"
                  ? "bg-conces-blue text-white font-medium"
                  : "text-gray-700 font-medium bg-slate-200 hover:bg-gray-100"
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

              <form onSubmit={handleSignupSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-800 mb-1"
                      htmlFor="fullname"
                    >
                      Full Name
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

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-800 mb-1"
                      htmlFor="email"
                    >
                      Email Address
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
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-800 mb-1"
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

                  <div>
                    <label
                      className="block text-sm font-medium text-gray-800 mb-1"
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
                        placeholder="University Name"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-800 mb-1"
                    htmlFor="role"
                  >
                    Select Your Role
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
                      <option value="student">student</option>
                      <option value="alumni">alumni</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-royal-400">
                      <FaChevronDown />
                    </div>
                  </div>
                  <div
                    id="role-description"
                    className="mt-2 text-sm text-royal-500 italic"
                  >
                    <p>
                      As a Student, you'll have access to courses, events,
                      mentorship, and devotionals.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-800 mb-1"
                      htmlFor="password"
                    >
                      Password
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
                    {passwordStrength && (
                      <div className="mt-1">
                        <div className="flex items-center mt-1">
                          <div
                            className={`h-1 w-1/4 rounded-full ${
                              passwordStrength === "weak"
                                ? "bg-red-500"
                                : "bg-gray-200"
                            }`}
                          ></div>
                          <div
                            className={`h-1 w-1/4 rounded-full mx-1 ${
                              passwordStrength === "medium" ||
                              passwordStrength === "strong"
                                ? "bg-yellow-500"
                                : "bg-gray-200"
                            }`}
                          ></div>
                          <div
                            className={`h-1 w-1/4 rounded-full mx-1 ${
                              passwordStrength === "strong"
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          ></div>
                          <div className="h-1 w-1/4 bg-gray-200 rounded-full"></div>
                        </div>
                        <p className="text-xs text-royal-500 mt-1">
                          Password strength: {getPasswordStrengthText()}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm  font-medium text-gray-800 mb-1"
                      htmlFor="confirm-password"
                    >
                      Confirm Password
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
                      className="ml-2 block text-sm text-gray-800"
                    >
                      I agree to the{" "}
                      <span className="text-gold-600 hover:text-gold-700 font-medium cursor-pointer">
                        Terms of Service
                      </span>{" "}
                      and{" "}
                      <span className="text-gold-600 hover:text-gold-700 font-medium cursor-pointer">
                        Privacy Policy
                      </span>
                    </label>
                  </div>
                  {errors.terms && (
                    <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>

                <div className="mb-6">
                  <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center">
                    <div className="w-full max-w-xs">
                      <p className="text-center text-sm text-gray-800 mb-2">
                        Please verify you're human
                      </p>
                      <div
                        className={`border ${
                          errors.captcha ? "border-red-300" : "border-royal-300"
                        } rounded-md bg-white p-3 flex items-center`}
                      >
                        <input
                          type="checkbox"
                          id="captcha"
                          name="captcha"
                          checked={formData.captcha}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-gold-600 border-royal-300 rounded focus:ring-gold-500"
                        />
                        <span className="ml-3 text-sm text-gray-800">
                          I'm not a robot
                        </span>
                        <img
                          src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                          alt="reCAPTCHA"
                          className="h-8 ml-auto"
                        />
                      </div>
                      {errors.captcha && (
                        <p className="mt-1 text-sm text-red-600 text-center">
                          {errors.captcha}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
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
                  <p className="mt-4 text-center text-sm text-royal-600">
                    Already have an account?{" "}
                    <span
                      className="text-gold-600 hover:text-gold-700 font-medium cursor-pointer"
                      onClick={() => handleTabChange("login")}
                    >
                      Log in
                    </span>
                  </p>
                </div>
              </form>
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

              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-sm font-medium text-gray-800 mb-1"
                    htmlFor="login-email"
                  >
                    Email Address
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
                      className="block text-sm font-medium text-gray-800"
                      htmlFor="login-password"
                    >
                      Password
                    </label>
                    <span className="text-sm text-gold-600 hover:text-gold-700 font-medium cursor-pointer">
                      Forgot password?
                    </span>
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
                      className="ml-2 block text-sm text-gray-800"
                    >
                      Remember me on this device
                    </label>
                  </div>
                </div>

                <div className="mb-6">
                  <button
                    type="submit"
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

                <div className="relative flex items-center justify-center mb-6">
                  <div className="border-t border-gray-300 absolute w-full"></div>
                  <div className="bg-white px-4 relative z-10 text-sm text-royal-500">
                    Or continue with
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <button
                    type="button"
                    className="flex items-center justify-center py-2 px-4 border border-royal-300 rounded-md shadow-sm bg-white text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    <FaGoogle className="text-red-500 mr-2" />
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center py-2 px-4 border border-royal-300 rounded-md shadow-sm bg-white text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    <FaMicrosoft className="text-blue-500 mr-2" />
                    Microsoft
                  </button>
                </div>

                <p className="text-center text-sm text-royal-600">
                  Don't have an account?{" "}
                  <span
                    className="text-gold-600 hover:text-gold-700 font-medium cursor-pointer"
                    onClick={() => handleTabChange("signup")}
                  >
                    Sign up
                  </span>
                </p>
              </form>
            </div>
          )}

          {/* Email Verification */}
          {activeTab === "verification" && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaEnvelope className="text-gold-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-conces-blue mb-2">
                Verify Your Email
              </h2>
              <p className="text-royal-600 mb-6">
                We've sent a 6-digit verification code to{" "}
                <span className="font-medium">{formData.email}</span>.
              </p>

              <form onSubmit={handleVerificationSubmit}>
                <div className="mb-6">
                  <p className="text-royal-600 mb-2">Enter the 6-digit code:</p>
                  <div className="flex justify-center space-x-2">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`verification-${index}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleVerificationCodeChange(
                            index,
                            e.target.value.replace(/\D/g, "")
                          )
                        }
                        className="w-12 h-12 text-center border border-royal-300 rounded-md text-xl font-medium focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || verificationCode.join("").length !== 6}
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 mb-4 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </button>

                <p className="text-royal-600">
                  Didn't receive the code?{" "}
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={isLoading}
                    className="text-gold-600 hover:text-gold-700 font-medium disabled:opacity-50"
                  >
                    Resend
                  </button>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Alumni Dashboard */}
      {activeTab === "alumni-dashboard" && (
        <div>
          <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center">
                <div className="text-gold-600 text-2xl font-bold mr-8">
                  CONCES
                </div>
                <nav className="hidden md:flex space-x-6">
                  <span className="text-royal-900 font-medium hover:text-gold-600 transition-colors cursor-pointer">
                    Home
                  </span>
                  <span className="text-royal-500 hover:text-gold-600 transition-colors cursor-pointer">
                    Alumni Network
                  </span>
                  <span className="text-royal-500 hover:text-gold-600 transition-colors cursor-pointer">
                    Guest Lectures
                  </span>
                  <span className="text-royal-500 hover:text-gold-600 transition-colors cursor-pointer">
                    Mentorship
                  </span>
                  <span className="text-royal-500 hover:text-gold-600 transition-colors cursor-pointer">
                    Job Board
                  </span>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <button className="text-royal-500 hover:text-gray-800">
                  <FaBell />
                </button>
                <div className="relative">
                  <button className="flex items-center text-gray-800 hover:text-royal-900">
                    <img
                      src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                      alt="User"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="ml-2 font-medium hidden md:block">
                      Robert Smith
                    </span>
                    <span className="ml-1 text-xs px-2 py-0.5 bg-gold-100 text-gold-700 rounded-full hidden md:block">
                      Alumni
                    </span>
                    <FaChevronDown className="ml-1 text-xs" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 min-h-[calc(100vh-64px)]">
            <div className="max-w-7xl mx-auto px-4 py-8">
              <div className="bg-gradient-to-r from-gold-600 to-gold-800 rounded-lg p-6 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div>
                    <h1 className="text-white text-2xl font-bold mb-2">
                      Welcome back, Robert! 👋
                    </h1>
                    <p className="text-gold-100">
                      Your alumni journey continues. Let's explore what's new
                      today.
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <button className="bg-white text-gold-600 hover:bg-gold-50 px-4 py-2 rounded-md font-medium">
                      View Your Network
                    </button>
                  </div>
                </div>
              </div>

              {/* Alumni-specific content goes here */}
            </div>
          </div>
        </div>
      )}
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-royal-500">
            © 2023 CONCES. All rights reserved.
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
