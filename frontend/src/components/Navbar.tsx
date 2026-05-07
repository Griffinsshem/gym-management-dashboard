"use client";

import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  LogOut,
  X,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api";

type Notification = {
  id: string;
  message: string;
  type: string;
  date?: string;
};

export default function Navbar() {
  const { user, logout, searchQuery, setSearchQuery } = useAuth();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // ================= FETCH NOTIFICATIONS =================
  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);

      const res = await apiClient.get("/notifications");

      setNotifications(res.data.data || []);
    } catch (err: any) {
      console.error("NOTIFICATIONS ERROR:", err?.response || err);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    fetchNotifications();

    const interval = setInterval(() => {
      fetchNotifications();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // ================= CLICK OUTSIDE =================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(e.target as Node)
      ) {
        setShowNotifications(false);
      }

      if (
        userRef.current &&
        !userRef.current.contains(e.target as Node)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white border-b shadow-sm">

      {/* LEFT */}
      <div>
        <h2 className="text-lg font-bold text-gray-900">
          Dashboard Overview
        </h2>
        <p className="text-xs text-gray-500">
          Welcome back, {user?.email?.split("@")[0]}
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search size={16} className="text-gray-400" />

          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search members..."
            className="bg-transparent outline-none ml-2 text-sm text-gray-700 placeholder-gray-400"
          />

          {searchQuery && (
            <button onClick={() => setSearchQuery("")}>
              <X size={14} className="text-gray-400 ml-2" />
            </button>
          )}
        </div>

        {/* NOTIFICATIONS */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative hover:scale-105 transition"
          >
            <Bell size={18} className="text-gray-700" />

            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-1 text-[10px] flex items-center justify-center bg-red-500 text-white rounded-full">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg p-3 z-50 animate-in fade-in zoom-in-95">
              <p className="text-xs text-gray-500 mb-2 font-medium">
                Notifications
              </p>

              {/* LOADING */}
              {loadingNotifications ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="animate-spin w-4 h-4 text-gray-400" />
                </div>
              ) : notifications.length === 0 ? (
                <p className="text-sm text-gray-400">
                  No notifications
                </p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="text-sm text-gray-700 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                    >
                      <p>{n.message}</p>

                      {n.date && (
                        <p className="text-[10px] text-gray-400 mt-1">
                          {new Date(n.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* USER */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:bg-gray-100 px-2 py-1 rounded-lg transition"
          >
            <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold shadow">
              {user?.email?.charAt(0)?.toUpperCase() || "?"}
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-800">
                {user?.email}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {user?.role}
              </span>
            </div>

            <ChevronDown size={14} className="text-gray-500" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="px-4 py-2 border-b">
                <p className="text-sm font-medium text-gray-800">
                  {user?.email}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role}
                </p>
              </div>

              <button
                onClick={logout}
                className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}