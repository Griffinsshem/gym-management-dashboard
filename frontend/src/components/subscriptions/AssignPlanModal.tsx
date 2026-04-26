"use client";

import { useEffect, useState } from "react";

type Plan = {
  id: number;
  name: string;
  price: number;
};

export default function AssignPlanModal({
  member,
  onClose,
  onAssign,
}: {
  member: { id: number; full_name: string };
  onClose: () => void;
  onAssign: (planId: number) => Promise<void>;
}) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPlans([
      { id: 1, name: "Basic Plan", price: 1000 },
      { id: 2, name: "Pro Plan", price: 2000 },
      { id: 3, name: "Premium Plan", price: 3000 },
    ]);
  }, []);

  const handleAssign = async () => {
    if (!selectedPlan) return;

    try {
      setLoading(true);
      await onAssign(selectedPlan);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[400px] p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Assign Plan to {member.full_name}
        </h2>

        <select
          className="w-full border p-2 rounded mb-4 text-gray-700"
          value={selectedPlan ?? ""}
          onChange={(e) => setSelectedPlan(Number(e.target.value))}
        >
          <option value="">Select a plan</option>
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.name} - KES {plan.price}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={!selectedPlan || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}