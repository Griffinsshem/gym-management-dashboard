"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function AttendanceChart({
  data,
}: {
  data: any[];
}) {
  const chartData = data.reduce((acc: any[], record) => {
    const date = new Date(record.check_in_time)
      .toISOString()
      .split("T")[0];

    const existing = acc.find((d) => d.date === date);

    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }

    return acc;
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4 text-gray-800">
        Attendance Trends
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}