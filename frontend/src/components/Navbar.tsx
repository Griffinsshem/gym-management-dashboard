"use client";

import { useEffect, useState } from "react";
import { Search, Bell } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      {/* Left */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Dashboard Overview
        </h2>
        <p className="text-xs text-gray-500">
          Welcome back, manage your gym efficiently
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none ml-2 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Notifications */}
        <div className="relative cursor-pointer">
          <Bell size={18} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shadow">
            {user?.email?.charAt(0)?.toUpperCase() || "?"}
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium text-gray-800">
              {user?.email || "Loading..."}
            </span>
            <span className="text-xs text-gray-500">
              Admin
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}