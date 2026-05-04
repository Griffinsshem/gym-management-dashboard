"use client";

import { deletePlan } from "@/lib/subscription";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react";

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

  const isPremium = plan.price_kes > 5000; // simple highlight logic

  return (
    <div
      className={`relative bg-white rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1
      ${isPremium ? "border-blue-500 shadow-md" : "border-gray-200"}`}
    >
      {/* Badge */}
      {isPremium && (
        <span className="absolute top-3 right-3 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
          Popular
        </span>
      )}

      {/* Plan Name */}
      <h2 className="text-lg font-semibold text-gray-800">
        {plan.name}
      </h2>

      {/* Price */}
      <div className="mt-4">
        <span className="text-3xl font-bold text-gray-900">
          KES {plan.price_kes}
        </span>
        <span className="text-sm text-gray-500 ml-1">
          / {plan.duration_days} days
        </span>
      </div>

      {/* Divider */}
      <div className="my-4 h-px bg-gray-100" />

      {/* Features (simple for now) */}
      <ul className="text-sm text-gray-600 space-y-1">
        <li>✔ Full gym access</li>
        <li>✔ Access during working hours</li>
        <li>✔ Basic support</li>
      </ul>

      {/* Admin Actions */}
      {isAdmin && (
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={() => onEdit(plan)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center gap-1 text-sm text-red-600 hover:underline"
          >
            <Trash2 size={14} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}