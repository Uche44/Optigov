import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import {
  Shield,
  Mail,
  Phone,
  Lock,
  User,
  Eye,
  EyeOff,
  Sun,
  Moon,
  AlertCircle,
} from "lucide-react";
import {
  UserRole,
  SignupData,
  LoginData,
  StoredUser,
} from "../types/authTypes";

// type UserRole = 'citizen' | 'company' | 'admin';
type FormMode = "login" | "signup";

type ValidationContext = {
  mode: "signup" | "login";
  role: UserRole;
  signupData?: SignupData;
  loginData?: LoginData;
};

const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserRole>("citizen");
  const [formMode, setFormMode] = useState<FormMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [signupData, setSignupData] = useState<SignupData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "citizen",
  });

  const [loginData, setLoginData] = useState<LoginData>({
    emailOrPhone: "",
    password: "",
  });

  const { login } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const tabs: { key: UserRole; label: string; color: string }[] = [
    { key: "citizen", label: "Citizen", color: "bg-green-600" },
    { key: "company", label: "Company", color: "bg-blue-600" },
    { key: "admin", label: "Admin", color: "bg-purple-600" },
  ];

  const validate = (context: ValidationContext): string | null => {
    const { mode, role, signupData, loginData } = context;

    // Helper regex/functions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+234|0)[789][01]\d{8}$/;
    const businessDomains = [".com.ng", ".ng", ".com", ".org", ".net"];
    const excludePersonalDomains = [
      "gmail.com",
      "yahoo.com",
      "hotmail.com",
      "outlook.com",
    ];

    const isBusinessEmail = (email: string) => {
      const domain = email.split("@")[1]?.toLowerCase();
      if (!domain) return false;
      if (excludePersonalDomains.includes(domain)) return false;
      return businessDomains.some((bd) => domain.includes(bd.replace(".", "")));
    };

    if (mode === "signup" && signupData) {
      if (!signupData.fullName.trim()) return "Full name is required";
      if (!emailRegex.test(signupData.email))
        return "Please enter a valid email address";

      if (role === "company" && !isBusinessEmail(signupData.email)) {
        return "Company accounts must use business email domains (not gmail, yahoo, etc.)";
      }
      if (role === "citizen" && isBusinessEmail(signupData.email)) {
        return "Citizen accounts should use personal email addresses like gmail.com";
      }

      if (!phoneRegex.test(signupData.phone.replace(/\s/g, ""))) {
        return "Please enter a valid Nigerian phone number";
      }
      if (signupData.password.length < 6)
        return "Password must be at least 6 characters long";
      if (signupData.password !== signupData.confirmPassword)
        return "Passwords do not match";
    }

    if (mode === "login" && loginData) {
      if (!loginData.emailOrPhone.trim())
        return "Email or phone number is required";
      if (!loginData.password.trim()) return "Password is required";
    }

    return null; // No errors
  };

  const handleSignup = async () => {
    setError("");

    const validationError = validate({
      mode: "signup",
      role: activeTab,
      signupData,
    });
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://optigov-backend.onrender.com/api/auth/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signupData.fullName,
            email: signupData.email,
            phone: signupData.phone,
            password: signupData.password,
            password_confirm: signupData.confirmPassword,
            role: activeTab,
          }),
        }
      );
      const data = await response.json();

      console.log("Signup response:", data);
      if (!response.ok) {
        setError(data.message || "Signup failed. Please try again.");
        setLoading(false);
        return;
      }

      // Get existing users from localStorage
      // const existingUsers: StoredUser[] = JSON.parse(localStorage.getItem('optigov_users') || '[]');

      // // Check if user already exists
      // const userExists = existingUsers.some(user =>
      //   user.email === signupData.email || user.phone === signupData.phone
      // );

      // if (userExists) {
      //   setError('User with this email or phone number already exists');
      //   setLoading(false);
      //   return;
      // }

      // // Create new user
      // const newUser: StoredUser = {
      //   id: Date.now().toString(),
      //   fullName: signupData.fullName,
      //   email: signupData.email,
      //   phone: signupData.phone,
      //   password: signupData.password, // In real app, this would be hashed
      //   role: activeTab,
      //   createdAt: new Date().toISOString()
      // };

      // // Save to localStorage with persistent key
      // const updatedUsers = [...existingUsers, newUser];
      // localStorage.setItem('optigov_users', JSON.stringify(updatedUsers));

      // Simulate API call delay
      setTimeout(() => {
        login(signupData.email, activeTab, signupData.fullName);

        // Redirect based on role
        switch (activeTab) {
          case "citizen":
            navigate("/citizen-dashboard");
            break;
          case "company":
            navigate("/company-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");

    if (!loginData.emailOrPhone.trim()) {
      setError("Email or phone number is required");
      return;
    }

    if (!loginData.password.trim()) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    try {
      // Get users from localStorage with persistent key
      const existingUsers: StoredUser[] = JSON.parse(
        localStorage.getItem("optigov_users") || "[]"
      );

      // Find user by email or phone
      const user = existingUsers.find(
        (u) =>
          (u.email === loginData.emailOrPhone ||
            u.phone === loginData.emailOrPhone) &&
          u.password === loginData.password &&
          u.role === activeTab
      );

      // Simulate API call delay
      setTimeout(() => {
        if (user) {
          login(user.email, user.role, user.fullName);

          // Redirect based on role
          switch (user.role) {
            case "citizen":
              navigate("/citizen-dashboard");
              break;
            case "company":
              navigate("/company-dashboard");
              break;
            case "admin":
              navigate("/admin-dashboard");
              break;
          }
        } else {
          setError("Invalid credentials or user not found for this role");
        }
        setLoading(false);
      }, 1000);
    } catch (error) {
      setError("An error occurred during login. Please try again.");
      setLoading(false);
    }
  };

  const handleTabChange = (role: UserRole) => {
    setActiveTab(role);
    setSignupData((prev) => ({ ...prev, role }));
    setError("");
  };

  const resetForms = () => {
    setSignupData({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      role: activeTab,
    });
    setLoginData({
      emailOrPhone: "",
      password: "",
    });
    setError("");
  };

  const switchMode = (mode: FormMode) => {
    setFormMode(mode);
    resetForms();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 mb-6"
          >
            <Shield className="h-10 w-10 text-green-600" />
            <span className="text-3xl font-bold text-gray-900 dark:text-white">
              OptiGov
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {formMode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {formMode === "login"
              ? "Sign in to your account"
              : "Join OptiGov to protect your data rights"}
          </p>
        </div>

        {/* Role Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`flex-1 py-4 px-4 text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? `${tab.color} text-white`
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Mode Toggle */}
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6">
              <button
                onClick={() => switchMode("login")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  formMode === "login"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => switchMode("signup")}
                className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
                  formMode === "signup"
                    ? "bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Email Guidelines */}
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                <strong>Email Guidelines:</strong>
                <br />
                {activeTab === "citizen" &&
                  "• Citizens: Use personal emails (gmail.com, yahoo.com, etc.)"}
                {activeTab === "company" &&
                  "• Companies: Use business domains (company.com.ng, business.com, etc.)"}
                {activeTab === "admin" && "• Admins: Can use any email type"}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                <span className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </span>
              </div>
            )}

            {formMode === "signup" ? (
              /* Signup Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={signupData.fullName}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={signupData.email}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder={
                        activeTab === "citizen"
                          ? "user@gmail.com"
                          : activeTab === "company"
                          ? "admin@company.com.ng"
                          : "admin@optigov.ng"
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={signupData.phone}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="+234 xxx xxx xxxx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={signupData.confirmPassword}
                      onChange={(e) =>
                        setSignupData((prev) => ({
                          ...prev,
                          confirmPassword: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleSignup}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    tabs.find((t) => t.key === activeTab)?.color
                  } text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            ) : (
              /* Login Form */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email or Phone Number
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={loginData.emailOrPhone}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          emailOrPhone: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter email or phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    tabs.find((t) => t.key === activeTab)?.color
                  } text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            ← Back to homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
