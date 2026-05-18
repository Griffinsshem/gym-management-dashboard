import {
  CalendarDays,
  CheckCircle2,
  XCircle,
  Clock3,
  History,
  Crown,
} from "lucide-react";

type Subscription = {
  id: number;
  plan_name?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
};

interface SubscriptionHistoryCardProps {
  subscriptions: Subscription[];
}

export default function SubscriptionHistoryCard({
  subscriptions,
}: SubscriptionHistoryCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 backdrop-blur-xl shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/70 via-white to-blue-50/70" />
      <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-violet-100/40 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600" />

      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-violet-500/25">
            <History className="h-6 w-6" />
          </div>

          <div>
            <h3 className="text-xl font-bold tracking-tight text-gray-900">
              Subscription History
            </h3>
            <p className="text-sm text-gray-500">
              View your past and current membership plans
            </p>
          </div>
        </div>

        {/* Empty State */}
        {subscriptions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50/80 p-8 text-center">
            <History className="mx-auto mb-3 h-10 w-10 text-gray-300" />
            <p className="text-base font-semibold text-gray-900">
              No Subscription History
            </p>
            <p className="mt-1 text-sm text-gray-500">
              No subscription history found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((subscription) => {
              const status =
                subscription.status || "Unknown";

              const normalizedStatus =
                status.toLowerCase();

              const statusColor =
                normalizedStatus === "active"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : normalizedStatus === "expired"
                    ? "bg-red-50 text-red-700 border-red-100"
                    : "bg-gray-100 text-gray-700 border-gray-200";

              const StatusIcon =
                normalizedStatus === "active"
                  ? CheckCircle2
                  : normalizedStatus === "expired"
                    ? XCircle
                    : Clock3;

              return (
                <div
                  key={subscription.id}
                  className="group rounded-3xl border border-gray-100 bg-white/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    {/* Left Content */}
                    <div className="flex items-start gap-4 min-w-0">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-md">
                        <Crown className="h-5 w-5 text-yellow-400" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate">
                          {subscription.plan_name ||
                            "Unnamed Plan"}
                        </p>

                        <div className="mt-2 flex items-start gap-2 text-sm text-gray-500">
                          <CalendarDays className="h-4 w-4 mt-0.5 text-gray-400" />
                          <span className="leading-5">
                            {subscription.start_date
                              ? new Date(
                                subscription.start_date
                              ).toLocaleDateString()
                              : "N/A"}
                            {" → "}
                            {subscription.end_date
                              ? new Date(
                                subscription.end_date
                              ).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap ${statusColor}`}
                    >
                      <StatusIcon className="h-3.5 w-3.5" />
                      {status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}