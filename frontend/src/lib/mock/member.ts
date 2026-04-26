export type Member = {
  id: number;
  full_name: string;
  phone: string;
  email: string;
};

let members: Member[] = [
  { id: 1, full_name: "John Doe", phone: "0712345678", email: "john@example.com" },
  { id: 2, full_name: "Jane Doe", phone: "0798765432", email: "jane@example.com" },
];

export const getMembers = async () => {
  return members;
};

export const addMember = async (member: Omit<Member, "id">) => {
  const newMember = { id: Date.now(), ...member };
  members.push(newMember);
  return newMember;
};

export const updateMember = async (id: number, updated: Partial<Member>) => {
  members = members.map((m) => (m.id === id ? { ...m, ...updated } : m));
};