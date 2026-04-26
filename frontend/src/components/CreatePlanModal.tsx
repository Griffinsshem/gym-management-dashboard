"use client";

import { useState } from "react";

export default function CreatePlanModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (plan: any) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
  });

  if (!open) return null;

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.duration) return;

    onCreate({
      name: form.name,
      price: Number(form.price),
      duration: Number(form.duration),
    });

    setForm({ name: "", price: "", duration: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-96">
        <h2 className="text-lg font-semibold mb-4">Create Plan</h2>

        <input
          placeholder="Plan Name"
          className="w-full border p-2 rounded mb-3"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Price"
          type="number"
          className="w-full border p-2 rounded mb-3"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <input
          placeholder="Duration (days)"
          type="number"
          className="w-full border p-2 rounded mb-3"
          value={form.duration}
          onChange={(e) =>
            setForm({ ...form, duration: e.target.value })
          }
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}