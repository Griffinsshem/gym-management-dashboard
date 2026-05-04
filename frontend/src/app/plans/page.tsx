"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import PlanCard from "@/components/PlanCard";
import CreatePlanModal from "@/components/CreatePlanModal";
import { useAuth } from "@/context/AuthContext";
import { getPlans } from "@/lib/subscription";
import toast from "react-hot-toast";
import { Loader2, Plus } from "lucide-react";

export default function PlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const { isAdmin } = useAuth();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const data = await getPlans();
      setPlans(data);
    } catch {
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
          {/* ================= HEADER ================= */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Membership Plans
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Manage your gym subscription plans
              </p>
            </div>

            {isAdmin && (
              <button
                onClick={() => {
                  setSelectedPlan(null);
                  setOpen(true);
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
              >
                <Plus size={18} />
                Create Plan
              </button>
            )}
          </div>

          {/* ================= LOADING ================= */}
          {loading ? (
            <div className="flex justify-center items-center py-20 text-gray-500">
              <Loader2 className="animate-spin w-6 h-6 mr-2" />
              Loading plans...
            </div>
          ) : plans.length === 0 ? (
            /* ================= EMPTY ================= */
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                No plans yet
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Create your first membership plan to get started
              </p>

              {isAdmin && (
                <button
                  onClick={() => setOpen(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Create Plan
                </button>
              )}
            </div>
          ) : (
            /* ================= GRID ================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  onDeleteSuccess={fetchPlans}
                  onEdit={(plan) => {
                    setSelectedPlan(plan);
                    setOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isAdmin && (
        <CreatePlanModal
          open={open}
          onClose={() => {
            setOpen(false);
            setSelectedPlan(null);
          }}
          onSuccess={fetchPlans}
          initialData={selectedPlan}
        />
      )}
    </div>
  );
}