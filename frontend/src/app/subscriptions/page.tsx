"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";

type Subscription = {
  id: number;
  member_name: string;
  plan_name: string;
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

  const getStatusStyle = (status: string) => {
    if (status === "active")
      return "bg-green-100 text-green-700";
    if (status === "cancelled")
      return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Subscriptions
          </h1>

          {loading ? (
            <div className="space-y-3">
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : subs.length === 0 ? (
            <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
              No subscriptions found
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="p-4">Member</th>
                    <th className="p-4">Plan</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Start Date</th>
                    <th className="p-4">End Date</th>
                  </tr>
                </thead>

                <tbody>
                  {subs.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="p-4 font-medium text-gray-800">
                        {s.member_name}
                      </td>

                      <td className="p-4 text-gray-700">
                        {s.plan_name}
                      </td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                            s.status
                          )}`}
                        >
                          {s.status}
                        </span>
                      </td>

                      <td className="p-4 text-gray-600">
                        {new Date(
                          s.start_date
                        ).toLocaleDateString()}
                      </td>

                      <td className="p-4 text-gray-600">
                        {new Date(
                          s.end_date
                        ).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}