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
  if (!subscription) {
    return (
      <div className="bg-white rounded-xl shadow p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">
          My Subscription
        </h3>

        <p className="text-sm text-gray-500">
          No active subscription found.
        </p>
      </div>
    );
  }

  const endDate = subscription.end_date
    ? new Date(subscription.end_date)
    : null;

  // Prefer backend-provided value if available.
  // Fallback to local calculation.
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

  const statusText = isExpired
    ? "Expired"
    : expiresToday
      ? "Expires Today"
      : "Active";

  const statusColor = isExpired
    ? "text-red-600"
    : expiresToday
      ? "text-orange-600"
      : "text-green-600";

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
        : "text-green-600";

  return (
    <div className="bg-white rounded-xl shadow p-5 border">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        My Subscription
      </h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Plan</span>
          <span className="font-medium text-gray-900">
            {subscription.plan_name || "N/A"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span className={`font-medium ${statusColor}`}>
            {statusText}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">Expires</span>
          <span className="font-medium text-gray-900">
            {endDate
              ? endDate.toLocaleDateString()
              : "N/A"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Days Remaining
          </span>
          <span
            className={`font-medium ${countdownColor}`}
          >
            {countdownText}
          </span>
        </div>
      </div>

      {/* Progress Bar (only for active subscriptions) */}
      {daysRemaining > 0 && (
        <div className="mt-4">
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{
                width: `${Math.min(
                  100,
                  (daysRemaining / 30) * 100
                )}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Warning Message */}
      {isExpired && (
        <p className="mt-4 text-sm text-red-600 font-medium">
          Your membership has expired. Please contact
          the gym to renew.
        </p>
      )}

      {expiringSoon && (
        <p className="mt-4 text-sm text-yellow-600 font-medium">
          Your subscription is expiring soon. Renew to
          maintain uninterrupted access.
        </p>
      )}

      {expiresToday && (
        <p className="mt-4 text-sm text-orange-600 font-medium">
          Your subscription expires today.
        </p>
      )}
    </div>
  );
}