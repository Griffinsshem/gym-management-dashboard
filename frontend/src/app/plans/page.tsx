"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import CreatePlanModal from "@/components/CreatePlanModal";
import { useAuth } from "@/context/AuthContext";
import { getPlans } from "@/lib/subscription";
import toast from "react-hot-toast";

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { isAdmin } = useAuth();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getPlans();
      setPlans(data);
    } catch (err: any) {
      toast.error("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gray-50 min-h-screen">
        <Navbar />

        <div className="p-6 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Membership Plans
            </h1>

            {isAdmin && (
              <button
                onClick={() => setOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                + Create Plan
              </button>
            )}
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading plans...
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p className="text-lg font-medium">No plans yet</p>
              <p className="text-sm">Create your first membership plan</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {plans.map((plan, index) => (
                <PlanCard key={plan.id} plan={plan} onDeleteSuccess={fetchPlans} />
              ))}
            </div>
          )}
        </div>
      </div>

      {isAdmin && (
        <CreatePlanModal
          open={open}
          onClose={() => setOpen(false)}
          onCreate={async () => {
            await fetchPlans();
          }}
        />
      )}
    </div>
  );
}