"use client";

import { deletePlan } from "@/lib/subscription";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

type Plan = {
  id: number;
  name: string;
  price_kes: number;
  duration_days: number;
};

export default function PlanCard({
  plan,
  onDeleteSuccess,
  onEdit,
}: {
  plan: Plan;
  onDeleteSuccess: () => void;
  onEdit: (plan: Plan) => void;
}) {
  const { isAdmin } = useAuth();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this plan?"
    );

    if (!confirmDelete) return;

    try {
      await deletePlan(plan.id);
      toast.success("Plan deleted");

      onDeleteSuccess();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to delete plan");
    }
  };

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

      {/* Admin Actions */}
      {isAdmin && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(plan)}
            className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}