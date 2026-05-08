"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  ClipboardList,
  UserCog,
  LogOut,
  Dumbbell,
} from "lucide-react";

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { logout, isAdmin, isStaff, user } = useAuth();
  const pathname = usePathname();

  const isMember = user?.role === "member";

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "staff", "member"],
    },
    {
      name: "Members",
      href: "/members",
      icon: Users,
      roles: ["admin", "staff"],
    },
    {
      name: "Plans",
      href: "/plans",
      icon: ClipboardList,
      roles: ["admin"],
    },
    {
      name: "Subscriptions",
      href: "/subscriptions",
      icon: CreditCard,
      roles: ["admin", "staff"],
    },

    // NEW STAFF MANAGEMENT PAGE
    {
      name: "Staff",
      href: "/dashboard/staff",
      icon: UserCog,
      roles: ["admin"],
    },
  ];

  const currentRole = isAdmin
    ? "admin"
    : isStaff
      ? "staff"
      : isMember
        ? "member"
        : null;

  const filteredNav = navItems.filter((item) =>
    currentRole ? item.roles.includes(currentRole) : false
  );

  return (
    <div className="w-64 h-screen bg-gray-900 text-gray-200 flex flex-col justify-between p-5 border-r border-gray-800">

      {/* TOP */}
      <div>

        {/* LOGO */}
        <div className="mb-10">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg">
              <Dumbbell size={20} className="text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Gym<span className="text-blue-500">Pro</span>
              </h1>

              <p className="text-xs text-gray-400">
                Management Dashboard
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="space-y-2">
          {filteredNav.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center gap-3 px-4 py-3 rounded-xl
                  text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <item.icon
                  size={18}
                  className={`
                    transition-transform duration-200
                    ${isActive ? "scale-110" : "group-hover:scale-105"}
                  `}
                />

                <span>{item.name}</span>

                {isActive && (
                  <span className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 pt-4">

        {/* USER INFO */}
        <div className="mb-4 px-3">
          <p className="text-sm font-medium text-white truncate">
            {user?.email}
          </p>

          <p className="text-xs text-gray-400 capitalize mt-1">
            {user?.role}
          </p>
        </div>

        {/* LOGOUT */}
        <button
          onClick={logout}
          className="
            w-full flex items-center gap-3 px-4 py-3 rounded-xl
            text-sm text-gray-400
            hover:bg-red-500/10 hover:text-red-400
            transition-all duration-200
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}