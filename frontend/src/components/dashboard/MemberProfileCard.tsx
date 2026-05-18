"use client";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";

type Props = {
  user: {
    id?: number;
    full_name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    date_of_birth?: string;
    member_id?: number;
    role?: string;
  } | null;
};

export default function MemberProfileCard({ user }: Props) {
  const formatLabel = (value?: string | number | null) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }
    return value;
  };

  const fields = [
    {
      label: "Full Name",
      value: formatLabel(user?.full_name),
      icon: User,
    },
    {
      label: "Email",
      value: formatLabel(user?.email),
      icon: Mail,
    },
    {
      label: "Phone",
      value: formatLabel(user?.phone),
      icon: Phone,
    },
    {
      label: "Role",
      value: user?.role
        ? user.role.charAt(0).toUpperCase() +
        user.role.slice(1)
        : "N/A",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      {/* Top Gradient Accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      {/* Decorative Background */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-50" />

      <div className="relative p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
              <User className="w-7 h-7" />
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-[11px] font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3" />
                Personal Information
              </div>

              <h3 className="text-xl font-bold text-gray-900 tracking-tight">
                My Profile
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Your account and contact details.
              </p>
            </div>
          </div>

          {user?.role && (
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-xs font-semibold shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              Verified Member
            </div>
          )}
        </div>

        {/* Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => {
            const Icon = field.icon;

            return (
              <div
                key={field.label}
                className="group relative rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-50/80 p-5 hover:shadow-md hover:border-blue-100 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>

                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </div>

                <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-gray-400 mb-2">
                  {field.label}
                </p>

                <p className="text-sm lg:text-base font-semibold text-gray-900 break-words leading-relaxed">
                  {field.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}