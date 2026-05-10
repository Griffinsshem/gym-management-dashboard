"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dumbbell,
  Loader2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import toast from "react-hot-toast";

import { registerUser, loginUser } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    if (!form.email || !form.password) {
      return toast.error(
        "Email and password are required"
      );
    }

    if (form.password.length < 8) {
      return toast.error(
        "Password must be at least 8 characters"
      );
    }

    try {
      setLoading(true);

      await registerUser(
        form.email,
        form.password
      );

      const res = await loginUser(
        form.email,
        form.password
      );

      const {
        access_token,
        id,
        email,
        role,
        member_id,
      } = res;

      login({
        token: access_token,
        user: {
          id,
          email,
          role,
          member_id,
        },
      });

      toast.success(
        "Account created successfully 🎉"
      );

      router.push("/dashboard");
    } catch (err: any) {
      const errorData =
        err?.response?.data?.error;

      const message =
        typeof errorData === "string"
          ? errorData
          : errorData?.message ||
          "Registration failed";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden lg:flex flex-col justify-center bg-blue-600 text-white p-16 relative overflow-hidden">

        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-90" />

        <div className="relative z-10 max-w-lg">

          <div className="flex items-center gap-3 mb-8">

            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Dumbbell size={28} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                GymPro
              </h1>

              <p className="text-blue-100 text-sm">
                Smart Gym Management
              </p>
            </div>
          </div>

          <h2 className="text-5xl font-bold leading-tight">
            Start Your Fitness Journey Today
          </h2>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Join GymPro and manage your gym
            memberships, subscriptions, and
            fitness progress seamlessly.
          </p>

          <div className="mt-10 space-y-4">

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Track subscriptions easily</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Monitor attendance in real-time</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <p>Access your dashboard anywhere</p>
            </div>

          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-50 px-6 py-10">

        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-gray-900">
              Create Account
            </h2>

            <p className="text-gray-900 mt-2 font-semibold">
              Register to access GymPro
            </p>
          </div>

          {/* EMAIL */}
          <div className="mb-5">

            <label className="text-sm font-medium text-gray-900 mb-2 block">
              Email Address
            </label>

            <div className="flex items-center border border-gray-600 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

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

            <div className="flex items-center border border-gray-600 rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-blue-500">

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
                placeholder="Minimum 8 characters"
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

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />
                Creating Account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>

          {/* LOGIN LINK */}
          <p className="text-sm text-gray-900 text-center mt-6 font-semibold">

            Already have an account?{" "}

            <button
              onClick={() =>
                router.push("/login")
              }
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}