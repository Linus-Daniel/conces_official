"use client";
import {
  ChangeEvent,
  FormEvent,
  InputHTMLAttributes,
  ReactHTMLElement,
  useState,
} from "react";
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
  FaComment,
  FaGaugeHigh,
  FaChartLine,
  FaUsers,
  FaUserGraduate,
  FaUserTie,
  FaUserShield,
  FaBookOpen,
  FaCalendarDays,
  FaBookBible,
  FaGear,
  FaShield,
  FaFileLines,
  FaArrowUp,
  FaClock,
} from "react-icons/fa6";
import { FaInfoCircle, FaCheck, FaTimes } from "react-icons/fa";

const AuthFlow = () => {
  const [activeTab, setActiveTab] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
  const [passwordStrength, setPasswordStrength] = useState("weak");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value,
    }));
  
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
  };

  const calculatePasswordStrength = (password: string) => {
    // Simple password strength calculation
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length < 10) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
  };

  const handleSignupSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!formData.terms) {
      alert("You must agree to the terms and conditions");
      return;
    }
    if (!formData.captcha) {
      alert("Please verify you're not a robot");
      return;
    }
    // Here you would typically send the data to your backend
    console.log("Signup form submitted:", formData);
    setActiveTab("verification");
  };

  const handleLoginSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Login form submitted:", loginFormData);
    // For demo purposes, we'll just show the student dashboard
    setActiveTab("student-dashboard");
  };

  const handleVerificationSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Here you would verify the code with your backend
    console.log("Verification code submitted:", verificationCode.join(""));
    if (formData.role === "alumni") {
      setActiveTab("alumni-pending");
    } else {
      setActiveTab("student-dashboard");
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
                        className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>
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
                        className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
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
                        className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                        placeholder="+234 123 456 7890"
                      />
                    </div>
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
                      <option value="student">Student</option>
                      <option value="alumni">Branch Alumni</option>
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
                        className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
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
                        className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
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
                      className="h-4 w-4 text-gold-600 border-royal-300 rounded focus:ring-gold-500"
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
                </div>

                <div className="mb-6">
                  <div className="bg-gray-100 p-4 rounded-md flex items-center justify-center">
                    <div className="w-full max-w-xs">
                      <p className="text-center text-sm text-gray-800 mb-2">
                        Please verify you're human
                      </p>
                      <div className="border border-royal-300 rounded-md bg-white p-3 flex items-center">
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
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                  >
                    Create Account
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
                      className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
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
                      className="pl-10 w-full rounded-md border border-royal-300 py-2 px-3 text-royal-900 placeholder-royal-400 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
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
                    className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
                  >
                    Log In
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
                We've sent a verification link to{" "}
                <span className="font-medium">{formData.email}</span>. Please
                check your inbox and click the link to activate your account.
              </p>

              <form onSubmit={handleVerificationSubmit}>
                <div className="mb-6">
                  <p className="text-royal-600 mb-2">
                    Enter the 6-digit code sent to your email:
                  </p>
                  <div className="flex justify-center space-x-2">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) =>
                          handleVerificationCodeChange(index, e.target.value)
                        }
                        className="w-12 h-12 text-center border border-royal-300 rounded-md text-xl font-medium focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-gold-500"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold-600 hover:bg-gold-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500 mb-4"
                >
                  Verify Email
                </button>

                <p className="text-royal-600">
                  Didn't receive the email?{" "}
                  <button className="text-gold-600 hover:text-gold-700 font-medium">
                    Resend
                  </button>
                </p>
              </form>
            </div>
          )}

          {/* {activeTab === 'alumni-pending' && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-yellow-600 text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-conces-blue mb-2">Alumni Verification Pending</h2>
              <p className="text-royal-600 mb-6">Thank you for registering as a Branch Alumni. Your application is currently under review by our administrators.</p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <FaInfoCircle className="text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      You will receive an email notification once your alumni status has been verified. This process typically takes 1-2 business days.
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setActiveTab('student-dashboard')}
                className="w-full bg-royal-600 hover:bg-royal-700 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-500 mb-4"
              >
                Continue as Student
              </button>
              
              <p className="text-royal-600">
                Need help? <span className="text-gold-600 hover:text-gold-700 font-medium cursor-pointer">Contact Support</span>
              </p>
            </div>
          )} */}
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

export default AuthFlow;
