import { apiClient } from "./api";

export type Member = {
  id: number;
  full_name: string;
  phone: string;
  email?: string;

  activePlan?: {
    id: number;
    name: string;
  } | null;
};

export const getMembers = async (): Promise<Member[]> => {
  const res = await apiClient.get("/members");

  return res.data.data.map((m: any) => ({
    id: m.id,
    full_name: m.full_name,
    phone: m.phone,
    email: m.email || "",
    activePlan: null,
  }));
};

export const addMember = async (
  member: Omit<Member, "id">
): Promise<Member> => {
  const res = await apiClient.post("/members", member);

  return {
    id: res.data.data.id,
    full_name: res.data.data.full_name,
    phone: res.data.data.phone,
    email: member.email || "",
    activePlan: null,
  };
};

export const updateMember = async (
  id: number,
  updated: Partial<Member>
): Promise<void> => {
  await apiClient.patch(`/members/${id}`, updated);
};