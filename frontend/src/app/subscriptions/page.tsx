"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getMembers, Member } from "@/lib/member";

type Subscription = {
  memberName: string;
  planName: string;
  status: "Active" | "None";
};

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const load = async () => {
      const members = await getMembers();

      const subs: Subscription[] = members.map((m) => ({
        memberName: m.full_name,
        planName: m.activePlan?.name || "-",
        status: m.activePlan ? "Active" : "None",
      }));

      setSubscriptions(subs);
    };

    load();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-800 mb-4">
            Subscriptions
          </h1>

          <table className="w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="text-left border-b text-gray-600">
                <th className="p-3">Member</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {subscriptions.map((sub, idx) => (
                <tr key={idx} className="border-b text-gray-700">
                  <td className="p-3">{sub.memberName}</td>
                  <td className="p-3">{sub.planName}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-sm ${sub.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-500"
                        }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}