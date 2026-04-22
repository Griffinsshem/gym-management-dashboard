import { ReactNode } from "react";

export default function StatsCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: ReactNode;
}) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-800">{value}</h3>
        </div>

        <div className="p-3 bg-gray-100 rounded-lg text-gray-600">
          {icon}
        </div>
      </div>
    </div>
  );
}