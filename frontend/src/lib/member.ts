import { apiClient } from "./api";

export type Member = {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
};


export const getMembers = async (): Promise<Member[]> => {
  const res = await apiClient.get("/members");

  return res.data.data.map((m: any) => ({
    id: m.id,
    full_name: m.full_name,
    phone: m.phone,
    email: m.email || "",
  }));
};

export const addMember = async (member: {
  full_name: string;
  phone: string;
  email?: string;
  gender?: string;
  date_of_birth?: string;
}): Promise<Member> => {

  const payload = {
    full_name: member.full_name,
    phone: member.phone,
    email: member.email || null,
    gender: member.gender || null,
    date_of_birth: member.date_of_birth || null,
  };

  const res = await apiClient.post("/members", payload);

  return {
    id: res.data.data.id,
    full_name: res.data.data.full_name,
    phone: res.data.data.phone,
    email: payload.email || "",
  };
};


export const updateMember = async (
  id: number,
  updated: Partial<Member>
): Promise<void> => {
  await apiClient.patch(`/members/${id}`, updated);
};