"use client";

import {
  UserCircle2,
  ShieldAlert,
  Mail,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import MemberProfileCard from "@/components/dashboard/MemberProfileCard";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

export default function MemberProfilePage() {
  const { user, isMember } = useAuth();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      if (!user?.member_id) {
        setLoading(false);
        return;
      }

      try {
        const res = await apiClient.get(
          `/members/${user.member_id}`
        );
        setMember(res.data.data);
      } catch (error) {
        console.error("Failed to fetch member details", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [user?.member_id]);

  // Restrict page to members only
  if (!isMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-red-100 bg-white/90 backdrop-blur-xl shadow-xl p-8">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red-500 to-orange-500" />

            <div className="flex items-start gap-4 text-red-600">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                <ShieldAlert className="w-6 h-6" />
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Access Restricted
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  This page is only available to registered gym members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Combine backend member data + auth data
  // This ensures every field gets the best available value.
  const profileData = {
    id: member?.id ?? user?.member_id,

    full_name:
      member?.full_name ??
      user?.email?.split("@")[0] ??
      "N/A",

    email:
      member?.email ??
      user?.email ??
      "N/A",

    phone:
      member?.phone ??
      "N/A",

    gender:
      member?.gender ??
      "N/A",

    date_of_birth:
      member?.date_of_birth ??
      "N/A",

    // MemberProfileCard expects `member_id`
    member_id:
      member?.id ??
      user?.member_id,

    role:
      user?.role ??
      "member",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* ===== HERO SECTION ===== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl text-white">
          {/* Background effects */}
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs uppercase tracking-wider font-semibold text-blue-100 mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                Member Profile
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight flex items-center gap-3">
                <UserCircle2 className="w-9 h-9" />
                My Profile
              </h1>

              <p className="mt-3 text-blue-100 max-w-2xl leading-relaxed">
                View and manage your personal information and
                membership account details.
              </p>
            </div>

            {/* Right Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-6 py-5 min-w-[280px] shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center">
                  <BadgeCheck className="w-5 h-5" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wide text-blue-100">
                    Member Account
                  </p>
                  <p className="text-sm text-white/80">
                    Verified Access
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-blue-100 mb-1">
                    Email
                  </p>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-100" />
                    <p className="text-sm font-semibold truncate">
                      {profileData.email}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-blue-100 mb-1">
                    Role
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold capitalize">
                    {profileData.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== PROFILE CARD ===== */}
        {loading ? (
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <p className="text-gray-500">
              Loading profile...
            </p>
          </div>
        ) : (
          <MemberProfileCard user={profileData} />
        )}
      </div>
    </div>
  );
}