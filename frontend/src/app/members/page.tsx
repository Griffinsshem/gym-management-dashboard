"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import MembersTable from "@/components/members/MembersTable";
import AddMemberModal from "@/components/members/AddMemberModal";
import EditMemberModal from "@/components/members/EditMemberModal";
import {
  getMembers,
  addMember,
  updateMember,
  Member,
} from "@/lib/mock/member";
import AssignPlanModal from "@/components/subscriptions/AssignPlanModal";

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [assigning, setAssigning] = useState<Member | null>(null);

  const loadMembers = async () => {
    const data = await getMembers();
    setMembers(data);
  };

  useEffect(() => {
    loadMembers();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">Members</h1>
            <button
              onClick={() => setShowAdd(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Member
            </button>
          </div>

          <MembersTable
            data={members}
            onEdit={(m) => setEditing(m)}
            onAssign={(m) => setAssigning(m)}
          />
        </div>
      </div>

      {showAdd && (
        <AddMemberModal
          onClose={() => setShowAdd(false)}
          onSave={async (data) => {
            await addMember(data);
            setShowAdd(false);
            loadMembers();
          }}
        />
      )}

      {editing && (
        <EditMemberModal
          member={editing}
          onClose={() => setEditing(null)}
          onSave={async (data) => {
            await updateMember(editing.id, data);
            setEditing(null);
            loadMembers();
          }}
        />
      )}

      {assigning && (
        <AssignPlanModal
          member={assigning}
          onClose={() => setAssigning(null)}
          onAssign={async (planId) => {
            console.log("Assign plan:", assigning.id, planId);
            setAssigning(null);
          }}
        />
      )}
    </div>
  );
}