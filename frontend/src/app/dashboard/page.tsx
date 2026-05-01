"use client";

import { useEffect, useState } from "react";
import { Users, Activity, ClipboardList, Loader2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import AssignPlanModal from "@/components/subscriptions/AssignPlanModal";
import { apiClient } from "@/lib/api";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [data, setData] = useState<any[]>([]);
  const [allAttendance, setAllAttendance] = useState<any[]>([]);
  const [membersCount, setMembersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [expiringSubs, setExpiringSubs] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [openRenewModal, setOpenRenewModal] = useState(false);

  const [stats, setStats] = useState({
    total_revenue: 0,
    active_subscriptions: 0,
    expiring_soon: 0,
  });

  const memberId = user?.member_id || null;

  // ================= FETCH =================

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
        } catch { }
      }

      setAllAttendance(all);
    } catch {
      toast.error("Failed to load global stats");
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await apiClient.get("/subscriptions/dashboard/stats");
      setStats(res.data.data);
    } catch {
      toast.error("Failed to load dashboard stats");
    }
  };

  const fetchExpiring = async () => {
    try {
      const res = await apiClient.get("/subscriptions/expiring");
      setExpiringSubs(res.data.data);
    } catch {
      toast.error("Failed to load expiring subscriptions");
    }
  };

  useEffect(() => {
    if (!memberId) return;

    fetchAttendance(memberId);
    fetchAllAttendance();
    fetchDashboardStats();
    fetchExpiring();
  }, [memberId]);

  // ================= ACTIONS =================

  const handleCheckIn = async () => {
    if (!memberId) return toast.error("User not loaded");

    try {
      setCheckingIn(true);

      await apiClient.post(`/attendance/check-in`, {
        member_id: memberId,
      });

      toast.success("Checked in successfully");

      fetchAttendance(memberId);
      fetchAllAttendance();
      fetchDashboardStats();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-in failed");
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    if (!memberId) return toast.error("User not loaded");

    try {
      setCheckingOut(true);

      await apiClient.post(`/attendance/check-out`, {
        member_id: memberId,
      });

      toast.success("Checked out successfully");

      fetchAttendance(memberId);
      fetchAllAttendance();
      fetchDashboardStats();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-out failed");
    } finally {
      setCheckingOut(false);
    }
  };

  // ================= RENEW FLOW =================

  const handleOpenRenew = (sub: any) => {
    setSelectedMember({
      id: sub.member_id,
      full_name: `Member #${sub.member_id}`,
    });
    setOpenRenewModal(true);
  };

  const handleAssignPlan = async (planId: number) => {
    try {
      // Assign already happens inside modal (assignPlan)
      toast.success("Subscription renewed");

      // Refresh dashboard
      fetchDashboardStats();
      fetchExpiring();
    } catch {
      toast.error("Failed to renew subscription");
    }
  };

  // ================= UI =================

  const hasActiveSession = data.some((r) => r.check_out_time === null);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatsCard
              title="Revenue (KES)"
              value={stats.total_revenue.toString()}
              icon={<ClipboardList />}
            />

            <StatsCard
              title="Active Subscriptions"
              value={stats.active_subscriptions.toString()}
              icon={<Activity />}
            />

            <StatsCard
              title="Expiring Soon"
              value={stats.expiring_soon.toString()}
              icon={<Users />}
            />
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleCheckIn}
              disabled={!memberId || hasActiveSession || checkingIn}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white
              ${!memberId || hasActiveSession || checkingIn
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700"
                }`}
            >
              {checkingIn && <Loader2 className="animate-spin w-4 h-4" />}
              {checkingIn ? "Checking In..." : "Check In"}
            </button>

            <button
              onClick={handleCheckOut}
              disabled={!memberId || !hasActiveSession || checkingOut}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg text-white
              ${!memberId || !hasActiveSession || checkingOut
                  ? "bg-gray-400"
                  : "bg-red-600 hover:bg-red-700"
                }`}
            >
              {checkingOut && <Loader2 className="animate-spin w-4 h-4" />}
              {checkingOut ? "Checking Out..." : "Check Out"}
            </button>
          </div>

          {/* Attendance */}
          <div className="mt-6">
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/4"></div>
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

          {/* Expiring */}
          <div className="mt-8 bg-white p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Expiring Soon
            </h2>

            {expiringSubs.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No subscriptions expiring soon
              </p>
            ) : (
              <div className="space-y-2">
                {expiringSubs.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <span className="text-sm text-gray-800">
                      Member #{sub.member_id}
                    </span>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-red-500">
                        Ends:{" "}
                        {new Date(sub.end_date).toLocaleDateString()}
                      </span>

                      <button
                        onClick={() => handleOpenRenew(sub)}
                        className="bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Renew
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {openRenewModal && selectedMember && (
        <AssignPlanModal
          member={selectedMember}
          onClose={() => setOpenRenewModal(false)}
          onAssign={handleAssignPlan}
        />
      )}
    </div>
  );
}