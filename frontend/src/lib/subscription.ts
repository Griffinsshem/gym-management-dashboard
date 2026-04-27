import { apiClient } from "./api";


export const getPlans = async () => {
  const res = await apiClient.get("/membership-plans");
  return res.data.data;
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