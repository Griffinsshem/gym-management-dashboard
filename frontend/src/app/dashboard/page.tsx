"use client";

import { useEffect, useState } from "react";
import { Users, Activity, ClipboardList, Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, token, logout } = useAuth();

  const [data, setData] = useState<any[]>([]);
  const [allAttendance, setAllAttendance] = useState<any[]>([]);
  const [membersCount, setMembersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const memberId = user?.member_id || null;

  // // Protect route
  // useEffect(() => {
  //   if (!token) {
  //     logout();
  //   }
  // }, [token]);

  // Fetch current user attendance
  const fetchAttendance = async (id: number) => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/attendance/member/${id}`);
      setData(res.data.data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setData([]);
      } else {
        toast.error("Failed to fetch attendance");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAllAttendance = async () => {
    try {
      const res = await apiClient.get("/members");
      const members = res.data.data;

      setMembersCount(members.length);

      let all: any[] = [];

      for (const m of members) {
        try {
          const r = await apiClient.get(`/attendance/member/${m.id}`);
          all = [...all, ...(r.data.data || [])];
        } catch {
          // ignore empty users
        }
      }

      setAllAttendance(all);
    } catch {
      toast.error("Failed to load global stats");
    }
  };

  // Trigger data load
  useEffect(() => {
    if (!memberId) return;

    fetchAttendance(memberId);
    fetchAllAttendance();
  }, [memberId]);

  // Stats
  const hasActiveSession = data.some((r) => r.check_out_time === null);

  const activeSessions = allAttendance.filter(
    (r) => r.check_out_time === null
  ).length;

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
      fetchAttendance(memberId);
      fetchAllAttendance();
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
      fetchAttendance(memberId);
      fetchAllAttendance();
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
              value={allAttendance.length.toString()}
              icon={<ClipboardList />}
            />
            <StatsCard
              title="Active Sessions"
              value={activeSessions.toString()}
              icon={<Activity />}
            />
            <StatsCard
              title="Members"
              value={membersCount.toString()}
              icon={<Users />}
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleCheckIn}
              disabled={!memberId || hasActiveSession || checkingIn}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-sm text-white transition
                ${!memberId || hasActiveSession || checkingIn
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {checkingIn && <Loader2 className="animate-spin w-4 h-4" />}
              {checkingIn ? "Checking In..." : "Check In"}
            </button>

            <button
              onClick={handleCheckOut}
              disabled={!memberId || !hasActiveSession || checkingOut}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg shadow-sm text-white transition
                ${!memberId || !hasActiveSession || checkingOut
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

          <div className="mt-6">
            <AttendanceChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}