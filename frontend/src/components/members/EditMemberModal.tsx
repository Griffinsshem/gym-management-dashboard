"use client";

import { useState } from "react";
import { Member } from "@/lib/mock/member";

export default function EditMemberModal({
  member,
  onClose,
  onSave,
}: {
  member: Member;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState(member);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Member</h2>

        <input
          value={form.full_name}
          className="w-full border rounded p-2 mb-2 text-gray-700"
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        />

        <input
          value={form.phone}
          className="w-full border rounded p-2 mb-2 text-gray-700"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          value={form.email}
          className="w-full border rounded p-2 mb-2 text-gray-700"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-gray-600 border rounded px-4 py-2">
            Cancel
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => onSave(form)}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}