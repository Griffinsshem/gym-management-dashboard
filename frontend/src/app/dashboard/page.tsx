"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Activity,
  ClipboardList,
  Loader2,
  TrendingUp,
} from "lucide-react";
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

  const memberId = user?.member_id;

  // ================= FETCH =================

  const fetchAttendance = async (id: number) => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/attendance/member/${id}`);
      setData(res.data.data);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const res = await apiClient.get("/subscriptions/dashboard/stats");
      setStats(res.data.data);
    } catch {
      toast.error("Failed to load stats");
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
    fetchDashboardStats();
    fetchExpiring();
  }, [memberId]);

  // ================= ACTIONS =================

  const handleCheckIn = async () => {
    if (!memberId) return;

    try {
      setCheckingIn(true);

      await apiClient.post(`/attendance/check-in`, {
        member_id: memberId,
      });

      toast.success("Checked in");
      fetchAttendance(memberId);
      fetchDashboardStats();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-in failed");
    } finally {
      setCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    if (!memberId) return;

    try {
      setCheckingOut(true);

      await apiClient.post(`/attendance/check-out`, {
        member_id: memberId,
      });

      toast.success("Checked out");
      fetchAttendance(memberId);
      fetchDashboardStats();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-out failed");
    } finally {
      setCheckingOut(false);
    }
  };

  const hasActiveSession = data.some((r) => r.check_out_time === null);

  return (
    <div className="flex bg-gray-100">
      <Sidebar />

      <div className="flex-1 min-h-screen">
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto space-y-6">

          {/* ===== HERO / GREETING ===== */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold">
              Welcome back 👋
            </h2>
            <p className="text-sm opacity-90">
              Here's what's happening in your gym today
            </p>
          </div>

          {/* ===== STATS ===== */}
          <div className="grid md:grid-cols-3 gap-6">
            <StatsCard
              title="Total Revenue"
              value={`KES ${stats.total_revenue}`}
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

          {/* ===== QUICK ACTIONS ===== */}
          <div className="bg-white rounded-xl shadow p-5 flex gap-4">
            <button
              onClick={handleCheckIn}
              disabled={!memberId || hasActiveSession || checkingIn}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition
              ${!memberId || hasActiveSession
                  ? "bg-gray-400"
                  : "bg-green-600 hover:bg-green-700 shadow"
                }`}
            >
              {checkingIn && <Loader2 className="animate-spin w-4 h-4" />}
              {checkingIn ? "Checking In..." : "Check In"}
            </button>

            <button
              onClick={handleCheckOut}
              disabled={!memberId || !hasActiveSession || checkingOut}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition
              ${!memberId || !hasActiveSession
                  ? "bg-gray-400"
                  : "bg-red-600 hover:bg-red-700 shadow"
                }`}
            >
              {checkingOut && <Loader2 className="animate-spin w-4 h-4" />}
              {checkingOut ? "Checking Out..." : "Check Out"}
            </button>
          </div>

          {/* ===== MAIN GRID ===== */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* LEFT (TABLE) */}
            <div className="md:col-span-2 bg-white rounded-xl shadow p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Recent Attendance
              </h3>

              {loading ? (
                <p className="text-gray-400 text-sm">Loading...</p>
              ) : (
                <AttendanceTable data={data} />
              )}
            </div>

            {/* RIGHT (EXPIRING) */}
            <div className="bg-white rounded-xl shadow p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Expiring Soon
              </h3>

              {expiringSubs.length === 0 ? (
                <p className="text-gray-400 text-sm">
                  No subscriptions expiring soon
                </p>
              ) : (
                <div className="space-y-3">
                  {expiringSubs.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-3 border rounded-lg flex justify-between items-center hover:bg-gray-50"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {sub.member_name || `Member #${sub.member_id}`}
                        </p>
                        <p className="text-xs text-red-500">
                          Ends:{" "}
                          {new Date(sub.end_date).toLocaleDateString()}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedMember({
                            id: sub.member_id,
                            full_name:
                              sub.member_name ||
                              `Member #${sub.member_id}`,
                          });
                          setOpenRenewModal(true);
                        }}
                        className="text-xs px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Renew
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ===== CHART ===== */}
          <div className="bg-white rounded-xl shadow p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <TrendingUp size={16} /> Attendance Trends
            </h3>

            <AttendanceChart data={data} />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {openRenewModal && selectedMember && (
        <AssignPlanModal
          member={selectedMember}
          onClose={() => setOpenRenewModal(false)}
          onAssign={async () => {
            toast.success("Subscription renewed");
            fetchDashboardStats();
            fetchExpiring();
          }}
        />
      )}
    </div>
  );
}