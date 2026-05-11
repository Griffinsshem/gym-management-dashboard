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
    <div className="bg-white rounded-xl shadow p-5 border">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        Subscription History
      </h3>

      {subscriptions.length === 0 ? (
        <p className="text-sm text-gray-500">
          No subscription history found.
        </p>
      ) : (
        <div className="space-y-4">
          {subscriptions.map((subscription) => {
            const status = subscription.status || "Unknown";

            const statusColor =
              status.toLowerCase() === "active"
                ? "bg-green-100 text-green-700"
                : status.toLowerCase() === "expired"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-700";

            return (
              <div
                key={subscription.id}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-gray-900">
                      {subscription.plan_name || "Unnamed Plan"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
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
                    </p>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}
                  >
                    {status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}