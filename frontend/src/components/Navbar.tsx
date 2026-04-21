"use client";

import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}