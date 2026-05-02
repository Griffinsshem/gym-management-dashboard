"use client";

import { useEffect, useState } from "react";
import { getPlans, assignPlan } from "@/lib/subscription";
import toast from "react-hot-toast";

type Plan = {
  id: number;
  name: string;
  price_kes: number;
};

export default function AssignPlanModal({
  member,
  onClose,
  onAssign,
  mode = "assign",
}: {
  member: { id: number; full_name: string };
  onClose: () => void;
  onAssign: (planId: number) => Promise<void>;
  mode?: "assign" | "renew";
}) {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch {
        toast.error("Failed to load plans");
      } finally {
        setLoadingPlans(false);
      }
    };

    loadPlans();
  }, []);

  const handleAssign = async () => {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    try {
      setLoading(true);

      await assignPlan(member.id, selectedPlan);

      await onAssign(selectedPlan);

      toast.success(
        mode === "renew"
          ? "Subscription renewed successfully"
          : "Plan assigned successfully"
      );

      onClose();
    } catch (err: any) {
      toast.error(
        err?.response?.data?.error || "Operation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-[400px] p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          {mode === "renew"
            ? `Renew Subscription`
            : `Assign Plan`}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {member.full_name}
        </p>

        {/* Plans */}
        {loadingPlans ? (
          <p className="text-gray-500 text-sm">
            Loading plans...
          </p>
        ) : plans.length === 0 ? (
          <p className="text-red-500 text-sm">
            No plans available
          </p>
        ) : (
          <select
            className="w-full border p-2 rounded mb-4 text-gray-700"
            value={selectedPlan ?? ""}
            disabled={loading}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedPlan(value ? Number(value) : null);
            }}
          >
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - KES {plan.price_kes}
              </option>
            ))}
          </select>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleAssign}
            disabled={!selectedPlan || loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading
              ? mode === "renew"
                ? "Renewing..."
                : "Assigning..."
              : mode === "renew"
                ? "Renew"
                : "Assign"}
          </button>
        </div>
      </div>
    </div>
  );
}