"use client";

import { useState } from "react";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

import {
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Dumbbell,
} from "lucide-react";

import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error(
        "Email and password are required"
      );
    }

    try {
      setLoading(true);

      const res = await loginUser(
        form.email,
        form.password
      );

      const {
        access_token,
        id,
        email: userEmail,
        member_id,
        role,
      } = res;

      login({
        token: access_token,
        user: {
          id,
          email: userEmail,
          member_id,
          role,
        },
      });

      toast.success("Welcome back 👋");

      router.push("/dashboard");
    } catch (err: any) {
      const errorData =
        err?.response?.data?.error;

      const message =
        typeof errorData === "string"
          ? errorData
          : errorData?.message ||
          "Invalid email or password";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-center bg-blue-600 text-white p-16 relative overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 opacity-95" />

        <div className="relative z-10 max-w-lg">

          {/* LOGO */}
          <div className="flex items-center gap-4 mb-10">

            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
              <Dumbbell size={30} />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                GymPro
              </h1>

              <p className="text-blue-100 text-sm mt-1">
                Modern Gym Management Platform
              </p>
            </div>
          </div>

          {/* HERO TEXT */}
          <h2 className="text-5xl font-bold leading-tight">
            Welcome Back To Your Fitness Hub
          </h2>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Manage members, subscriptions,
            attendance, staff, and analytics from
            one centralized dashboard.
          </p>

          {/* FEATURES */}
          <div className="mt-10 space-y-5">

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />

              <p className="text-blue-50">
                Real-time gym analytics
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />

              <p className="text-blue-50">
                Manage subscriptions easily
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />

              <p className="text-blue-50">
                Secure admin & staff access
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-50 px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

          {/* MOBILE LOGO */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">

            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center">
              <Dumbbell
                className="text-white"
                size={22}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                GymPro
              </h1>

              <p className="text-xs text-gray-500">
                Smart Gym Management
              </p>
            </div>
          </div>

          {/* HEADER */}
          <div className="mb-8">

            <h2 className="text-3xl font-bold text-gray-900">
              Welcome Back
            </h2>

            <p className="text-gray-900 mt-2">
              Login to continue to your dashboard
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">

            <label className="text-sm font-medium text-gray-900 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center border border-gray-600 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">

              <Mail
                size={18}
                className="text-gray-900"
              />

              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="flex-1 ml-3 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="mb-6">

            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Password
            </label>

            <div className="flex items-center border border-gray-600 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500 transition">

              <Lock
                size={18}
                className="text-gray-900"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({
                    ...form,
                    password: e.target.value,
                  })
                }
                className="flex-1 ml-3 outline-none text-gray-900 placeholder:text-gray-400 bg-transparent"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    className="text-gray-400"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="text-gray-400"
                  />
                )}
              </button>
            </div>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-3 rounded-xl font-medium text-white transition-all
              ${loading
                ? "bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20"
              }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Signing In...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* REGISTER LINK */}
          <p className="text-lg text-gray-900 text-center mt-6 font-bold">

            Don&apos;t have an account?{" "}

            <button
              onClick={() =>
                router.push("/register")
              }
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Create Account
            </button>
          </p>

          {/* FOOTER */}
          <p className="text-xs text-gray-900 mt-8 text-center">
            © {new Date().getFullYear()} GymPro.
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}