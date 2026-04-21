"use client";

import { LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="font-bold text-lg">Gym Dashboard</h1>

      <div className="flex items-center gap-4">
        <User size={20} />
        <button onClick={logout}>
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}