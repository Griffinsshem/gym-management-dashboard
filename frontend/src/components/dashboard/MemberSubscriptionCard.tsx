type Subscription = {
  plan_name?: string;
  status?: string;
  end_date?: string;
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

  const daysRemaining = endDate
    ? Math.max(
      0,
      Math.ceil(
        (endDate.getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
      )
    )
    : 0;

  const isExpired = daysRemaining <= 0;

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
          <span
            className={`font-medium ${isExpired ? "text-red-600" : "text-green-600"
              }`}
          >
            {isExpired ? "Expired" : "Active"}
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
          <span className="font-medium text-gray-900">
            {isExpired ? "0 days" : `${daysRemaining} days`}
          </span>
        </div>
      </div>

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

      {isExpired && (
        <p className="mt-4 text-sm text-red-600 font-medium">
          Your membership has expired. Please contact the gym to renew.
        </p>
      )}
    </div>
  );
}