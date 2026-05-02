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
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="p-4 text-left">Member</th>
            <th className="p-4 text-left">Contact</th>
            <th className="p-4 text-left">Plan</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody className="text-gray-700 text-sm">
          {data.map((member) => {
            const sub = subscriptions[member.id];

            return (
              <tr
                key={member.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Member Info */}
                <td className="p-4">
                  <div className="font-medium text-gray-900">
                    {member.full_name}
                  </div>
                  <div className="text-xs text-gray-500">
                    ID: #{member.id}
                  </div>
                </td>

                {/* Contact */}
                <td className="p-4">
                  <div>{member.phone}</div>
                  <div className="text-xs text-gray-500">
                    {member.email || "No email"}
                  </div>
                </td>

                {/* Plan */}
                <td className="p-4">
                  {sub ? (
                    <div className="flex flex-col gap-1">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs w-fit">
                        {sub.plan_name}
                      </span>

                      <span className="text-xs text-gray-500">
                        {sub.status}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-xs">
                      No active plan
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => onEdit(member)}
                      className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => onAssign(member)}
                      className="px-3 py-1 text-xs bg-green-50 text-green-600 rounded hover:bg-green-100 transition"
                    >
                      Assign Plan
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