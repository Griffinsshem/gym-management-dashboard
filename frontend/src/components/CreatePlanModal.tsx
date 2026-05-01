"use client";

import { useEffect, useState } from "react";
import { createPlan, updatePlan } from "@/lib/subscription";
import toast from "react-hot-toast";

type Plan = {
  id?: number;
  name: string;
  price_kes: number;
  duration_days: number;
};

export default function CreatePlanModal({
  open,
  onClose,
  onSuccess,
  initialData,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Plan | null;
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name,
        price: String(initialData.price_kes),
        duration: String(initialData.duration_days),
      });
    } else {
      setForm({ name: "", price: "", duration: "" });
    }
  }, [initialData]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.duration) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        description: form.name,
        price_kes: Number(form.price),
        duration_days: Number(form.duration),
      };

      if (initialData?.id) {
        await updatePlan(initialData.id, payload);
        toast.success("Plan updated successfully");
      } else {
        await createPlan(payload);
        toast.success("Plan created successfully");
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4 text-gray-900">
          {isEdit ? "Edit Plan" : "Create Plan"}
        </h2>

        <input
          placeholder="Plan Name"
          className="w-full border p-2 rounded mb-3 text-gray-900"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Price (KES)"
          type="number"
          className="w-full border p-2 rounded mb-3 text-gray-900"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Duration (days)"
          type="number"
          className="w-full border p-2 rounded mb-3 text-gray-900"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} disabled={loading}>
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded text-white ${loading
                ? "bg-gray-400 cursor-not-allowed"
                : isEdit
                  ? "bg-yellow-600"
                  : "bg-blue-600"
              }`}
          >
            {loading
              ? isEdit
                ? "Updating..."
                : "Creating..."
              : isEdit
                ? "Update"
                : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}