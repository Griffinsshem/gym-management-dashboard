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
} from "@/lib/member";
import AssignPlanModal from "@/components/subscriptions/AssignPlanModal";
import { apiClient } from "@/lib/api";
import { getPlans } from "@/lib/subscription";
import toast from "react-hot-toast";

type Subscription = {
  id: number;
  member_id: number;
  plan_id: number;
  status: string;
};

type Plan = {
  id: number;
  name: string;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [plans, setPlans] = useState<Plan[]>([]);

  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [assigning, setAssigning] = useState<Member | null>(null);

  const [loading, setLoading] = useState(true);

  const loadMembers = async () => {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch {
      toast.error("Failed to load members");
    }
  };

  const loadSubscriptions = async () => {
    try {
      const res = await apiClient.get("/subscriptions");
      setSubscriptions(res.data.data);
    } catch {
      toast.error("Failed to load subscriptions");
    }
  };

  const loadPlans = async () => {
    try {
      const data = await getPlans();
      setPlans(data);
    } catch {
      toast.error("Failed to load plans");
    }
  };

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      await Promise.all([
        loadMembers(),
        loadSubscriptions(),
        loadPlans(),
      ]);
      setLoading(false);
    };

    loadAll();
  }, []);

  const subscriptionsByMember = subscriptions.reduce(
    (acc: any, sub: Subscription) => {
      if (sub.status === "active") {
        const plan = plans.find((p) => p.id === sub.plan_id);

        acc[sub.member_id] = {
          plan_name: plan?.name || "Unknown Plan",
          status: sub.status,
        };
      }
      return acc;
    },
    {}
  );

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6">
          <div className="flex justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-800">
              Members
            </h1>

            <button
              onClick={() => setShowAdd(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Member
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <MembersTable
              data={members}
              subscriptions={subscriptionsByMember}
              onEdit={(m) => setEditing(m)}
              onAssign={(m) => setAssigning(m)}
            />
          )}
        </div>
      </div>

      {/* Add Member */}
      {showAdd && (
        <AddMemberModal
          onClose={() => setShowAdd(false)}
          onSave={async (data) => {
            try {
              await addMember(data);
              toast.success("Member created");
              setShowAdd(false);
              await loadMembers();
            } catch (err: any) {
              toast.error(
                err.response?.data?.error || "Failed to create member"
              );
            }
          }}
        />
      )}

      {/* Edit Member */}
      {editing && (
        <EditMemberModal
          member={editing}
          onClose={() => setEditing(null)}
          onSave={async (data) => {
            try {
              await updateMember(editing.id, data);
              toast.success("Member updated");
              setEditing(null);
              await loadMembers();
            } catch {
              toast.error("Failed to update member");
            }
          }}
        />
      )}

      {/* Assign Plan */}
      {assigning && (
        <AssignPlanModal
          member={assigning}
          onClose={() => setAssigning(null)}
          onAssign={async () => {
            await loadSubscriptions();
            setAssigning(null);
          }}
        />
      )}
    </div>
  );
}