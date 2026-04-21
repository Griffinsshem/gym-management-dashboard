"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getAttendance } from "@/lib/attendance";
import { Clock } from "lucide-react";

export default function AttendancePage() {
  const [records, setRecords] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAttendance(3);
    setRecords(data);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
          <Clock size={20} /> Attendance
        </h2>

        <div className="grid gap-4">
          {records.map((r) => (
            <div key={r.id} className="bg-white p-4 rounded-xl shadow">
              <p><strong>Check-in:</strong> {r.check_in_time}</p>
              <p><strong>Check-out:</strong> {r.check_out_time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}