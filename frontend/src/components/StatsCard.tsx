import { ReactNode } from "react";

type Props = {
  title: string;
  value: string;
  icon: ReactNode;
};

export default function StatsCard({ title, value, icon }: Props) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-2 text-gray-900">{value}</h3>
      </div>

      <div className="bg-gray-100 p-3 rounded-xl text-gray-700">
        {icon}
      </div>
    </div>
  );
}