"use client";

import { LayoutDashboard, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col p-5 shadow-lg">
      <h1 className="text-2xl font-bold mb-10">GymPro</h1>

      <nav className="flex flex-col gap-2">
        <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-lg bg-gray-800">
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800">
          <Users size={18} />
          Members
        </Link>
      </nav>

      <button
        onClick={logout}
        className="mt-auto flex items-center gap-2 text-red-400 hover:text-red-300"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}