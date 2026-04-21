"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Activity, ClipboardList } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import AttendanceTable from "@/components/AttendanceTable";

export default function Dashboard() {
  const [data, setData] = useState([]);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:5000/api/v1/attendance/member/3", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setData(res.data.data))
      .catch((err) => console.error(err));
  }, [token]);

  const handleCheckIn = async () => {
    await axios.post(
      "http://localhost:5000/api/v1/attendance/check-in/3",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    location.reload();
  };

  const handleCheckOut = async () => {
    await axios.post(
      "http://localhost:5000/api/v1/attendance/check-out/3",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    location.reload();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <StatsCard title="Total Records" value={data.length.toString()} icon={<ClipboardList />} />
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

          {/* Table */}
          <AttendanceTable data={data} />
        </div>
      </div>
    </div>
  );
}