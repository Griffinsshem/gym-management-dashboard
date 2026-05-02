"use client";

import { Member } from "@/lib/member";

type SubscriptionMap = {
  [memberId: number]: {
    plan_name: string;
    status: string;
  } | null;
};

export default function MembersTable({
  data,
  subscriptions,
  onEdit,
  onAssign,
}: {
  data: Member[];
  subscriptions: SubscriptionMap;
  onEdit: (member: Member) => void;
  onAssign: (member: Member) => void;
}) {
  const getStatusStyle = (status: string) => {
    if (status === "active")
      return "bg-green-100 text-green-700";
    if (status === "expired")
      return "bg-yellow-100 text-yellow-700";
    if (status === "cancelled")
      return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-500";
  };

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No members found
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="p-4 text-left">Member</th>
            <th className="p-4 text-left">Contact</th>
            <th className="p-4 text-left">Subscription</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-700">
          {data.map((member) => {
            const sub = subscriptions[member.id];

            return (
              <tr
                key={member.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* MEMBER */}
                <td className="p-4">
                  <div className="font-semibold text-gray-900">
                    {member.full_name}
                  </div>
                  <div className="text-xs text-gray-400">
                    ID: #{member.id}
                  </div>
                </td>

                {/* CONTACT */}
                <td className="p-4">
                  <div className="font-medium">
                    {member.phone}
                  </div>
                  <div className="text-xs text-gray-500">
                    {member.email || "No email"}
                  </div>
                </td>

                {/* SUBSCRIPTION */}
                <td className="p-4">
                  {sub ? (
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium text-gray-800">
                        {sub.plan_name}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium w-fit ${getStatusStyle(
                          sub.status
                        )}`}
                      >
                        {sub.status}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No active plan
                    </span>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEdit(member)}
                      className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onAssign(member)}
                      className="px-3 py-1 text-xs font-medium bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition"
                    >
                      Assign
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}