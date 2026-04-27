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
    <div className="w-64 h-screen bg-white border-r flex flex-col justify-between p-4">
      {/* Logo */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-8">
          Gym<span className="text-blue-600">Pro</span>
        </h1>

        {/* Nav */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded-lg transition
                  ${isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
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