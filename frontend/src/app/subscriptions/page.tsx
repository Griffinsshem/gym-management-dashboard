"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";

type Subscription = {
  id: number;
  member_id: number;
  plan_id: number;
  status: string;
  start_date: string;
  end_date: string;
};

export default function SubscriptionsPage() {
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  const loadSubscriptions = async () => {
    try {
      setLoading(true);

      const res = await apiClient.get("/subscriptions");
      setSubs(res.data.data);

    } catch {
      toast.error("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscriptions();
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

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <table className="w-full bg-white shadow rounded-lg">
              <thead>
                <tr className="text-left border-b text-gray-600">
                  <th className="p-3">Member ID</th>
                  <th className="p-3">Plan ID</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Start</th>
                  <th className="p-3">End</th>
                </tr>
              </thead>

              <tbody>
                {subs.map((s) => (
                  <tr key={s.id} className="border-b text-gray-700">
                    <td className="p-3">{s.member_id}</td>
                    <td className="p-3">{s.plan_id}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm ${s.status === "active"
                            ? "bg-green-100 text-green-700"
                            : s.status === "cancelled"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                      >
                        {s.status}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(s.start_date).toLocaleDateString()}
                    </td>

                    <td className="p-3">
                      {new Date(s.end_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}