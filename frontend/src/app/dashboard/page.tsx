"use client";

import { useEffect, useState } from "react";
import { Users, Activity, ClipboardList } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get("/attendance/member/3");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const handleCheckIn = async () => {
    try {
      await apiClient.post("/attendance/check-in/3");
      toast.success("Checked in successfully");
      fetchAttendance();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-in failed");
    }
  };

  const handleCheckOut = async () => {
    try {
      await apiClient.post("/attendance/check-out/3");
      toast.success("Checked out successfully");
      fetchAttendance();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-out failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatsCard
              title="Total Records"
              value={data.length.toString()}
              icon={<ClipboardList />}
            />
            <StatsCard title="Active Sessions" value="1" icon={<Activity />} />
            <StatsCard title="Members" value="10" icon={<Users />} />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleCheckIn}
              className="bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-lg shadow-sm"
            >
              Check In
            </button>

            <button
              onClick={handleCheckOut}
              className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-lg shadow-sm"
            >
              Check Out
            </button>
          </div>

          {/* Table / Skeleton */}
          <div className="mt-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ) : (
              <AttendanceTable data={data} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}