"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ClipboardList,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { logout } = useAuth();
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Members",
      href: "/members",
      icon: Users,
    },
    {
      name: "Plans",
      href: "/plans",
      icon: ClipboardList,
    },
    {
      name: "Subscriptions",
      href: "/subscriptions",
      icon: CreditCard,
    },
  ];

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-200 flex flex-col justify-between p-5">
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-10">
          <h1 className="text-2xl font-bold tracking-tight">
            Gym<span className="text-blue-500">Pro</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Management Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <item.icon
                  size={18}
                  className={`transition ${isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-white"
                    }`}
                />

                {item.name}

                {/* Active Indicator */}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 pt-4">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}