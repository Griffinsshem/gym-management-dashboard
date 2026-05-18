"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Activity,
  ClipboardList,
  Loader2,
  TrendingUp,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import MemberSubscriptionCard from "@/components/dashboard/MemberSubscriptionCard";
import AssignPlanModal from "@/components/subscriptions/AssignPlanModal";
import { apiClient } from "@/lib/api";
import {
  getMemberSubscription,
  getMemberSubscriptions,
} from "@/lib/subscription";
import MemberProfileCard from "@/components/dashboard/MemberProfileCard";
import SubscriptionHistoryCard from "@/components/dashboard/SubscriptionHistoryCard";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user, isAdmin, isStaff, isMember } = useAuth();

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [expiringSubs, setExpiringSubs] = useState<any[]>([]);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [openRenewModal, setOpenRenewModal] = useState(false);
  const [subscription, setSubscription] = useState<any>(null);
  const [subscriptionHistory, setSubscriptionHistory] = useState<any[]>([]);

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

  const fetchSubscription = async (id: number) => {
    try {
      const data = await getMemberSubscription(id);
      setSubscription(data);
    } catch {
      setSubscription(null);
    }
  };

  const fetchSubscriptionHistory = async (id: number) => {
    try {
      const data = await getMemberSubscriptions(id);
      setSubscriptionHistory(data);
    } catch {
      setSubscriptionHistory([]);
    }
  };

  useEffect(() => {
    if (!memberId) return;

    fetchAttendance(memberId);

    if (isMember) {
      fetchSubscription(memberId);
      fetchSubscriptionHistory(memberId);
    }

    if (isAdmin || isStaff) {
      fetchDashboardStats();
      fetchExpiring();
    }
  }, [memberId, isAdmin, isStaff, isMember]);

  // ================= ACTIONS =================

  const handleCheckIn = async () => {
    if (!memberId) return;

    try {
      setCheckingIn(true);

      await apiClient.post("/attendance/check-in", {
        member_id: memberId,
      });

      toast.success("Checked in");
      fetchAttendance(memberId);

      if (isMember) {
        fetchSubscription(memberId);
      }

      if (isAdmin || isStaff) {
        fetchDashboardStats();
      }
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

      await apiClient.post("/attendance/check-out", {
        member_id: memberId,
      });

      toast.success("Checked out");
      fetchAttendance(memberId);

      if (isMember) {
        fetchSubscription(memberId);
      }

      if (isAdmin || isStaff) {
        fetchDashboardStats();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Check-out failed");
    } finally {
      setCheckingOut(false);
    }
  };

  // ================= DERIVED STATE =================

  const hasActiveSession = data.some(
    (record) =>
      !record.check_out_time ||
      record.check_out_time === null
  );

  const subscriptionStatus =
    subscription?.status?.toLowerCase();

  const subscriptionEndDate = subscription?.end_date
    ? new Date(subscription.end_date)
    : null;

  const subscriptionDaysRemaining = subscriptionEndDate
    ? Math.max(
      0,
      Math.ceil(
        (subscriptionEndDate.getTime() - Date.now()) /
        (1000 * 60 * 60 * 24)
      )
    )
    : 0;

  const canCheckIn =
    !isMember ||
    (subscriptionStatus === "active" &&
      subscriptionDaysRemaining > 0);

  const disableCheckIn =
    !memberId ||
    hasActiveSession ||
    checkingIn ||
    !canCheckIn;

  // ================= UI =================

  return (
    <div className="flex bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="flex-1 min-h-screen">
        <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
          {/* ===== HERO ===== */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 shadow-2xl text-white">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-100 font-medium">
                  Dashboard Overview
                </p>
                <h1 className="text-3xl font-bold mt-2">
                  Welcome back{user?.email ? "," : ""} 👋
                </h1>
                <p className="mt-2 text-blue-100 max-w-2xl">
                  Here's what's happening in your gym today.
                  Track your attendance, membership, and progress in one place.
                </p>
              </div>

              {isMember && subscription && (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 min-w-[240px]">
                  <p className="text-xs uppercase tracking-wide text-blue-100 mb-1">
                    Current Plan
                  </p>
                  <p className="text-xl font-bold">
                    {subscription.plan_name}
                  </p>
                  <p className="text-sm text-blue-100 mt-1">
                    {subscriptionDaysRemaining} days remaining
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ===== STATS (ADMIN + STAFF ONLY) ===== */}
          {(isAdmin || isStaff) && (
            <div className="grid md:grid-cols-3 gap-6 text-gray-700">
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
          )}

          {/* ===== QUICK ACTIONS ===== */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Quick Actions
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your attendance with a single click.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleCheckIn}
                  disabled={disableCheckIn}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all ${disableCheckIn
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl"
                    }`}
                >
                  {checkingIn && (
                    <Loader2 className="animate-spin w-4 h-4" />
                  )}
                  {checkingIn ? "Checking In..." : "Check In"}
                </button>

                <button
                  onClick={handleCheckOut}
                  disabled={
                    !memberId ||
                    !hasActiveSession ||
                    checkingOut
                  }
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all ${!memberId ||
                      !hasActiveSession ||
                      checkingOut
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 shadow-lg hover:shadow-xl"
                    }`}
                >
                  {checkingOut && (
                    <Loader2 className="animate-spin w-4 h-4" />
                  )}
                  {checkingOut ? "Checking Out..." : "Check Out"}
                </button>
              </div>
            </div>

            {isMember && !canCheckIn && (
              <div className="mt-4 flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-4">
                <ShieldCheck className="w-4 h-4 mt-0.5" />
                <span>
                  Your membership is inactive or expired.
                  Please contact the gym to renew.
                </span>
              </div>
            )}
          </div>

          {/* ===== MEMBER PREMIUM GRID ===== */}
          {isMember && (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* LEFT COLUMN */}
              <div className="xl:col-span-2 space-y-6">
                <MemberSubscriptionCard
                  subscription={subscription}
                />

                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Attendance Trends
                  </h3>
                  <AttendanceChart data={data} />
                </div>

                <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock3 size={16} />
                    Recent Attendance
                  </h3>

                  {loading ? (
                    <p className="text-gray-400 text-sm">
                      Loading...
                    </p>
                  ) : (
                    <AttendanceTable data={data} />
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                <MemberProfileCard user={user} />
                <SubscriptionHistoryCard
                  subscriptions={subscriptionHistory}
                />
              </div>
            </div>
          )}

          {/* ===== ADMIN/STAFF LAYOUT ===== */}
          {!isMember && (
            <>
              <div className="grid md:grid-cols-3 gap-6">
                {/* LEFT */}
                <div className="md:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Recent Attendance
                  </h3>

                  {loading ? (
                    <p className="text-gray-400 text-sm">
                      Loading...
                    </p>
                  ) : (
                    <AttendanceTable data={data} />
                  )}
                </div>

                {/* RIGHT */}
                {(isAdmin || isStaff) && (
                  <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
                    <h3 className="text-sm font-bold text-gray-900 mb-4">
                      Expiring Soon
                    </h3>

                    {expiringSubs.length === 0 ? (
                      <p className="text-gray-500 text-sm">
                        No subscriptions expiring soon
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {expiringSubs.map((sub) => (
                          <div
                            key={sub.id}
                            className="p-3 border rounded-xl flex justify-between items-center hover:bg-gray-50"
                          >
                            <div>
                              <p className="text-sm font-medium">
                                {sub.member_name ||
                                  `Member #${sub.member_id}`}
                              </p>
                              <p className="text-xs text-red-500">
                                Ends:{" "}
                                {new Date(
                                  sub.end_date
                                ).toLocaleDateString()}
                              </p>
                            </div>

                            {isAdmin && (
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
                                className="text-xs px-3 py-1 bg-blue-600 text-white rounded-lg"
                              >
                                Renew
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <TrendingUp size={16} />
                  Attendance Trends
                </h3>

                <AttendanceChart data={data} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* ===== MODAL (ADMIN ONLY) ===== */}
      {isAdmin && openRenewModal && selectedMember && (
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