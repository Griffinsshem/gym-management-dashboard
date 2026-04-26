"use client";

import { useState } from "react";

export default function AddMemberModal({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
  });

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4 text-gray-800">Add Member</h2>

        <input
          placeholder="Full Name"
          className="w-full border p-2 rounded mb-2 text-gray-800"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          placeholder="Phone"
          className="w-full border p-2 rounded mb-2 text-gray-800"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Email"
          className="w-full border p-2 rounded mb-2 text-gray-800"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-gray-600 border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={() => onSave(form)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}