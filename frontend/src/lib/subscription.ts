import { apiClient } from "./api";

export const getPlans = async () => {
  const res = await apiClient.get("/plans");
  return res.data.data;
};

export const createPlan = async (data: {
  name: string;
  description: string;
  price_kes: number;
  duration_days: number;
}) => {
  const res = await apiClient.post("/plans", data);
  return res.data.data;
};

export const updatePlan = async (
  planId: number,
  data: Partial<{
    name: string;
    description: string;
    price_kes: number;
    duration_days: number;
  }>
) => {
  const res = await apiClient.patch(`/plans/${planId}`, data);
  return res.data.data;
};

export const deletePlan = async (planId: number) => {
  const res = await apiClient.delete(`/plans/${planId}`);
  return res.data;
};


export const assignPlan = async (
  memberId: number,
  planId: number
) => {
  await apiClient.post("/subscriptions", {
    member_id: memberId,
    plan_id: planId,
  });
};