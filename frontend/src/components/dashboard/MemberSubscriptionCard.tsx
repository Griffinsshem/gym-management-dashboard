"use client";

import {
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Crown,
  Clock3,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

type Subscription = {
  plan_name?: string;
  status?: string;
  end_date?: string;
  days_remaining?: number;
};

interface MemberSubscriptionCardProps {
  subscription: Subscription | null;
}

export default function MemberSubscriptionCard({
  subscription,
}: MemberSubscriptionCardProps) {
  // ================= EMPTY STATE =================
  if (!subscription) {
    return (
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70" />
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-100/40 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25">
              <Crown className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                My Subscription
              </h3>
              <p className="text-sm text-gray-500">
                Membership details and validity
              </p>
            </div>
          </div>

          {/* Empty State */}
          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/80 p-8 text-center">
            <ShieldCheck className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-base font-semibold text-gray-900">
              No Active Subscription
            </p>
            <p className="mt-1 text-sm text-gray-500">
              No active subscription found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ================= DATE CALCULATIONS =================
  const endDate = subscription.end_date
    ? new Date(subscription.end_date)
    : null;

  const calculatedDaysRemaining = endDate
    ? Math.ceil(
      (endDate.getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
    )
    : 0;

  const daysRemaining =
    subscription.days_remaining ??
    calculatedDaysRemaining;

  const isExpired = daysRemaining < 0;
  const expiresToday = daysRemaining === 0;
  const expiringSoon =
    daysRemaining > 0 && daysRemaining <= 7;

  // ================= STATUS =================
  const statusText = isExpired
    ? "Expired"
    : expiresToday
      ? "Expires Today"
      : "Active";

  const statusColor = isExpired
    ? "text-red-600 bg-red-50 border-red-100"
    : expiresToday
      ? "text-orange-600 bg-orange-50 border-orange-100"
      : "text-emerald-600 bg-emerald-50 border-emerald-100";

  const countdownText = isExpired
    ? `Expired ${Math.abs(daysRemaining)} day${Math.abs(daysRemaining) === 1 ? "" : "s"
    } ago`
    : expiresToday
      ? "Expires today"
      : expiringSoon
        ? `Expires in ${daysRemaining} day${daysRemaining === 1 ? "" : "s"
        }`
        : `${daysRemaining} days remaining`;

  const countdownColor = isExpired
    ? "text-red-600"
    : expiresToday
      ? "text-orange-600"
      : expiringSoon
        ? "text-yellow-600"
        : "text-emerald-600";

  const progressPercentage =
    daysRemaining > 0
      ? Math.min(100, (daysRemaining / 30) * 100)
      : 0;

  // ================= STATUS ICON =================
  const StatusIcon = isExpired
    ? XCircle
    : expiresToday || expiringSoon
      ? AlertTriangle
      : CheckCircle2;

  // ================= UI =================
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/70" />
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-blue-100/40 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-indigo-100/30 blur-3xl" />

      {/* Top Gradient Bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      <div className="relative p-6">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/25">
              <Crown className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900">
                My Subscription
              </h3>
              <p className="text-sm text-gray-500">
                Membership details and validity
              </p>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm ${statusColor}`}
          >
            <StatusIcon className="h-4 w-4" />
            {statusText}
          </div>
        </div>

        {/* Plan Hero */}
        <div className="relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 text-white shadow-xl">
          <div className="absolute top-0 right-0 h-28 w-28 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-yellow-400" />
              Premium Membership
            </div>

            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-slate-400">
              Current Plan
            </p>

            <div className="flex items-center justify-between gap-4">
              <h4 className="text-2xl font-bold tracking-tight">
                {subscription.plan_name || "N/A"}
              </h4>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400/10">
                <Crown className="h-6 w-6 text-yellow-400" />
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-300">
              Enjoy uninterrupted access to all gym services.
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Expiry Date */}
          <div className="rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50">
                <CalendarDays className="h-4 w-4 text-blue-600" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Expires On
              </p>
            </div>

            <p className="text-sm font-semibold text-gray-900">
              {endDate
                ? endDate.toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* Remaining Time */}
          <div className="rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50">
                <Clock3 className="h-4 w-4 text-indigo-600" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                Remaining
              </p>
            </div>

            <p
              className={`text-sm font-semibold ${countdownColor}`}
            >
              {countdownText}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        {daysRemaining > 0 && (
          <div className="mb-6 rounded-2xl border border-gray-100 bg-white/70 p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">
                Subscription Progress
              </p>
              <p className="text-xs font-bold text-gray-700">
                {Math.round(progressPercentage)}%
              </p>
            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-700"
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Alert Messages */}
        {isExpired && (
          <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              Your membership has expired. Please contact
              the gym to renew your plan.
            </p>
          </div>
        )}

        {expiringSoon && (
          <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
            <p className="text-sm font-medium text-yellow-700">
              Your subscription is expiring soon. Renew to
              maintain uninterrupted access.
            </p>
          </div>
        )}

        {expiresToday && (
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4">
            <p className="text-sm font-medium text-orange-700">
              Your subscription expires today.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}