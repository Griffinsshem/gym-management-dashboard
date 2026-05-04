"use client";

import { useState } from "react";
import { loginUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      return toast.error("Email and password are required");
    }

    try {
      setLoading(true);

      const res = await loginUser(form.email, form.password);

      const { access_token, id, email: userEmail, member_id, role } = res;

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
      toast.error(
        err?.response?.data?.error || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2">
      {/* LEFT SIDE (Brand / Visual) */}
      <div className="hidden md:flex flex-col justify-center items-center bg-blue-600 text-white p-10">
        <h1 className="text-4xl font-bold mb-4">
          Gym<span className="text-white/80">Pro</span>
        </h1>

        <p className="text-white/80 text-center max-w-sm">
          Manage your gym, members, and subscriptions in one
          powerful dashboard.
        </p>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Login to continue to your dashboard
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full mb-4 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            className="w-full mb-6 px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Button */}
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full flex justify-center items-center gap-2 py-2.5 rounded-lg text-white transition
              ${loading
                ? "bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {loading && <Loader2 className="animate-spin w-4 h-4" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {/* Footer */}
          <p className="text-xs text-gray-400 mt-6 text-center">
            © {new Date().getFullYear()} GymPro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}