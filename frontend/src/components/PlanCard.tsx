"use client";

type Plan = {
  id: number;
  name: string;
  price_kes: number;
  duration_days: number;
};

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow-sm border">
      <h2 className="text-lg font-semibold text-gray-900">
        {plan.name}
      </h2>

      <p className="text-2xl font-bold mt-2 text-green-600">
        KES {plan.price_kes}
      </p>

      <p className="text-gray-700 mt-1">
        {plan.duration_days} days
      </p>
    </div>
  );
}