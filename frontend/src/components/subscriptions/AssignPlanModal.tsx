"use client";

import { useEffect, useState } from "react";
import { getPlans, assignPlan } from "@/lib/subscription";

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
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const data = await getPlans();
        console.log("Loaded plans:", data);
        setPlans(data);
      } catch (err) {
        console.error("Failed to load plans", err);
      } finally {
        setLoadingPlans(false);
      }
    };

    loadPlans();
  }, []);

  const handleAssign = async () => {
    
    console.log("Assign button clicked");
    console.log("Selected plan raw:", selectedPlan);
    console.log("Type of selectedPlan:", typeof selectedPlan);
    console.log("Member:", member);

    if (!selectedPlan) {
      console.warn("No plan selected");
      return;
    }

    try {
      setLoading(true);

      console.log("Sending payload:", {
        memberId: member.id,
        planId: selectedPlan,
      });

      await assignPlan(member.id, selectedPlan);

      await onAssign(selectedPlan);

      onClose();
    } catch (err: any) {
      console.error("Failed to assign plan", err);
      console.error("Backend error:", err?.response?.data);
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

        {loadingPlans ? (
          <p className="text-gray-500">Loading plans...</p>
        ) : (
          <select
            className="w-full border p-2 rounded mb-4 text-gray-700"
            value={selectedPlan ?? ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              console.log("Dropdown selected:", value);
              setSelectedPlan(value);
            }}
          >
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name} - KES {plan.price}
              </option>
            ))}
          </select>
        )}

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