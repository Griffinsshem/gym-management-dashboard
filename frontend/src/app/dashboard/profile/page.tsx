"use client";

import { UserCircle2, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import MemberProfileCard from "@/components/dashboard/MemberProfileCard";

export default function MemberProfilePage() {
  const { user, isMember } = useAuth();

  if (!isMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-red-100 shadow-xl p-8">
            <div className="flex items-start gap-3 text-red-600">
              <ShieldCheck className="w-6 h-6 mt-0.5" />
              <div>
                <h1 className="text-xl font-bold">
                  Access Restricted
                </h1>
                <p className="text-sm text-red-500 mt-1">
                  This page is only available to gym members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* ===== HERO SECTION ===== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl text-white">
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-100 font-medium">
                Member Profile
              </p>

              <h1 className="text-3xl font-bold mt-2 flex items-center gap-3">
                <UserCircle2 className="w-8 h-8" />
                My Profile
              </h1>

              <p className="mt-2 text-blue-100 max-w-2xl">
                View your personal information and membership details.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 min-w-[240px]">
              <p className="text-xs uppercase tracking-wide text-blue-100 mb-1">
                Member Account
              </p>
              <p className="text-lg font-bold truncate">
                {user?.email}
              </p>
              <p className="text-sm text-blue-100 mt-1 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* ===== PROFILE CARD ===== */}
        <MemberProfileCard user={user} />
      </div>
    </div>
  );
}