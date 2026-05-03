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
    <div className="relative bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition overflow-hidden">
      {/* Accent Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

      <div className="flex justify-between items-center">
        {/* Text */}
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            {title}
          </p>

          <h3 className="text-2xl font-semibold text-gray-900 mt-1">
            {value}
          </h3>
        </div>

        {/* Icon */}
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600 shadow-inner">
          {icon}
        </div>
      </div>
    </div>
  );
}