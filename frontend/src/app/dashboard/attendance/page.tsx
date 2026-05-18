"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Loader2,
  TrendingUp,
} from "lucide-react";

import AttendanceTable from "@/components/AttendanceTable";
import AttendanceChart from "@/components/dashboard/AttendanceChart";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AttendancePage() {
  const { user, isMember } = useAuth();

  const [attendance, setAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const memberId = user?.member_id;

  useEffect(() => {
    if (!memberId || !isMember) return;

    const fetchAttendance = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(
          `/attendance/member/${memberId}`
        );
        setAttendance(res.data.data || []);
      } catch {
        setAttendance([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [memberId, isMember]);

  const totalVisits = attendance.length;

  const activeSessions = attendance.filter(
    (record) =>
      !record.check_out_time ||
      record.check_out_time === null
  ).length;

  const lastVisit =
    attendance.length > 0
      ? new Date(
        attendance[0].check_in_time
      ).toLocaleDateString()
      : "No visits yet";

  if (!isMember) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Access Restricted
            </h1>
            <p className="text-gray-500">
              This page is only available to gym members.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-8 shadow-2xl text-white">
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-100 font-medium">
                Attendance Overview
              </p>

              <h1 className="text-3xl font-bold mt-2">
                Your Gym Activity 📈
              </h1>

              <p className="mt-2 text-emerald-100 max-w-2xl">
                Track your attendance history and visualize
                your consistency over time.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 min-w-[240px]">
              <p className="text-xs uppercase tracking-wide text-emerald-100 mb-1">
                Total Visits
              </p>
              <p className="text-3xl font-bold">
                {totalVisits}
              </p>
              <p className="text-sm text-emerald-100 mt-1">
                Keep showing up 💪
              </p>
            </div>
          </div>
        </div>

        {/* ===== STATS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Total Visits
              </span>
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>

            <p className="text-3xl font-bold text-gray-900">
              {totalVisits}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Recorded check-ins
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Active Sessions
              </span>
              <Clock3 className="w-5 h-5 text-emerald-600" />
            </div>

            <p className="text-3xl font-bold text-gray-900">
              {activeSessions}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Sessions currently open
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-500">
                Last Visit
              </span>
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>

            <p className="text-lg font-bold text-gray-900">
              {lastVisit}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Most recent check-in
            </p>
          </div>
        </div>

        {/* ===== ATTENDANCE CHART ===== */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Attendance Trends
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Visual overview of your gym attendance over time.
          </p>

          <AttendanceChart data={attendance} />
        </div>

        {/* ===== ATTENDANCE TABLE ===== */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            Recent Attendance
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Detailed log of your check-in and check-out
            history.
          </p>

          {loading ? (
            <div className="flex items-center justify-center py-12 text-gray-500">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Loading attendance...
            </div>
          ) : (
            <AttendanceTable data={attendance} />
          )}
        </div>
      </div>
    </div>
  );
}