"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  BarChart3,
  CalendarDays,
  Activity,
} from "lucide-react";

import AttendanceChart from "@/components/dashboard/AttendanceChart";
import { apiClient } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function AttendanceTrendsPage() {
  const { user, isMember } = useAuth();

  const [attendanceData, setAttendanceData] = useState<any[]>([]);
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
        setAttendanceData(res.data.data || []);
      } catch {
        setAttendanceData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, [memberId, isMember]);

  // ===== DERIVED METRICS =====
  const totalVisits = attendanceData.length;

  const thisMonthVisits = attendanceData.filter((record) => {
    const checkInDate = new Date(record.check_in_time);
    const now = new Date();

    return (
      checkInDate.getMonth() === now.getMonth() &&
      checkInDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const currentStreak = (() => {
    if (!attendanceData.length) return 0;

    const sortedDates = attendanceData
      .map((record) =>
        new Date(record.check_in_time).toDateString()
      )
      .filter(
        (value, index, self) => self.indexOf(value) === index
      )
      .sort(
        (a, b) =>
          new Date(b).getTime() - new Date(a).getTime()
      );

    let streak = 0;
    let currentDate = new Date();

    for (const dateString of sortedDates) {
      const attendanceDate = new Date(dateString);
      const diffDays = Math.floor(
        (currentDate.setHours(0, 0, 0, 0) -
          attendanceDate.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24)
      );

      if (diffDays === streak) {
        streak++;
      } else if (diffDays > streak) {
        break;
      }
    }

    return streak;
  })();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-6 lg:p-8 space-y-8">
        {/* ===== HERO ===== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-8 shadow-2xl text-white">
          <div className="absolute inset-0 bg-black/10" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-100 font-medium">
                Performance Analytics
              </p>

              <h1 className="text-3xl font-bold mt-2">
                Attendance Trends 📈
              </h1>

              <p className="mt-2 text-blue-100 max-w-2xl">
                Visualize your workout consistency and track
                your gym attendance over time.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-4 min-w-[220px]">
              <p className="text-xs uppercase tracking-wide text-blue-100 mb-1">
                Total Visits
              </p>
              <p className="text-3xl font-bold">
                {totalVisits}
              </p>
              <p className="text-sm text-blue-100 mt-1">
                Lifetime check-ins
              </p>
            </div>
          </div>
        </div>

        {/* ===== SUMMARY STATS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Total Visits
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {totalVisits}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                <CalendarDays className="w-6 h-6 text-emerald-600" />
              </div>
            </div>

            <p className="text-sm text-gray-500">
              This Month
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {thisMonthVisits}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
            </div>

            <p className="text-sm text-gray-500">
              Current Streak
            </p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {currentStreak}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Consecutive days
            </p>
          </div>
        </div>

        {/* ===== CHART ===== */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-indigo-600" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Attendance Overview
              </h2>
              <p className="text-sm text-gray-500">
                Visual trend of your check-ins
              </p>
            </div>
          </div>

          {loading ? (
            <div className="h-72 flex items-center justify-center text-gray-400">
              Loading attendance trends...
            </div>
          ) : attendanceData.length === 0 ? (
            <div className="h-72 flex flex-col items-center justify-center text-center text-gray-500">
              <TrendingUp className="w-10 h-10 mb-3 text-gray-300" />
              <p className="font-medium">
                No attendance data available
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Your chart will appear after you start
                checking in.
              </p>
            </div>
          ) : (
            <AttendanceChart data={attendanceData} />
          )}
        </div>
      </div>
    </div>
  );
}