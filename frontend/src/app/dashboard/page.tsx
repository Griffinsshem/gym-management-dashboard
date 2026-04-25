"use client";

import { useEffect, useState } from "react";
import { Users, Activity, ClipboardList, Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [memberId, setMemberId] = useState<number | null>(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  // ✅ Auth + set memberId
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    if (storedUser) {
      const user = JSON.parse(storedUser);
      const resolvedMemberId = user.member_id || user.id;
      setMemberId(resolvedMemberId);
    }
  }, []);

  const fetchAttendance = async () => {
    if (!memberId) return;

    try {
      setLoading(true);
      const res = await apiClient.get(`/attendance/member/${memberId}`);
      setData(res.data.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setData([]);
      } else if (err.response?.status !== 401) {
        toast.error("Failed to fetch attendance");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [memberId]);

  const hasActiveSession = data.some(
    (r) => r.check_out_time === null
  );

  const handleCheckIn = async () => {
    if (!memberId) {
      toast.error("User not loaded");
      return;
    }

    try {
      setCheckingIn(true);
      await apiClient.post(`/attendance/check-in`, {
        member_id: memberId,
      });
      toast.success("Checked in successfully");
      fetchAttendance();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-in failed");
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    if (!memberId) {
      toast.error("User not loaded");
      return;
    }

    try {
      setCheckingOut(true);
      await apiClient.post(`/attendance/check-out`, {
        member_id: memberId,
      });
      toast.success("Checked out successfully");
      fetchAttendance();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-out failed");
    } finally {
      setCheckingOut(false);
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
            <StatsCard
              title="Active Sessions"
              value={hasActiveSession ? "1" : "0"}
              icon={<Activity />}
            />
            <StatsCard title="Members" value="10" icon={<Users />} />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleCheckIn}
              disabled={hasActiveSession || checkingIn}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-sm text-white transition
                ${hasActiveSession || checkingIn
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {checkingIn && <Loader2 className="animate-spin w-4 h-4" />}
              {checkingIn ? "Checking In..." : "Check In"}
            </button>

            <button
              onClick={handleCheckOut}
              disabled={!hasActiveSession || checkingOut}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-sm text-white transition
                ${!hasActiveSession || checkingOut
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
                }`}
            >
              {checkingOut && <Loader2 className="animate-spin w-4 h-4" />}
              {checkingOut ? "Checking Out..." : "Check Out"}
            </button>
          </div>

          {/* Table */}
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