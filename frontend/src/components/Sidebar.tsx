"use client";

import { LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between p-4">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Gym<span className="text-blue-600">Pro</span>
        </h1>

        {/* Nav */}
        <nav className="space-y-2">
          <div className="flex items-center gap-3 p-2 rounded-lg bg-blue-50 text-blue-600">
            <LayoutDashboard size={18} />
            <span className="font-medium">Dashboard</span>
          </div>
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}