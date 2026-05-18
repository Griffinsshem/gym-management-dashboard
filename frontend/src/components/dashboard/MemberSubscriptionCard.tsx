import {
  CalendarDays,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Crown,
  Clock3,
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
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />

        <div className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                My Subscription
              </h3>
              <p className="text-sm text-gray-500">
                Membership details and validity
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center">
            <p className="text-sm text-gray-500">
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
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
      {/* Top Gradient Bar */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg">
              <Crown className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-gray-900">
                My Subscription
              </h3>
              <p className="text-sm text-gray-500">
                Membership details and validity
              </p>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold ${statusColor}`}
          >
            <StatusIcon className="w-4 h-4" />
            {statusText}
          </div>
        </div>

        {/* Plan Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-5 mb-6 shadow-lg">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
            Current Plan
          </p>

          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold">
              {subscription.plan_name || "N/A"}
            </h4>

            <Crown className="w-7 h-7 text-yellow-400" />
          </div>

          <p className="mt-2 text-sm text-slate-300">
            Enjoy uninterrupted access to all gym services.
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Expiry Date */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CalendarDays className="w-4 h-4 text-blue-600" />
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
          <div className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock3 className="w-4 h-4 text-indigo-600" />
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
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-medium text-gray-500">
                Subscription Progress
              </p>
              <p className="text-xs font-semibold text-gray-700">
                {Math.round(progressPercentage)}%
              </p>
            </div>

            <div className="h-3 w-full rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700"
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