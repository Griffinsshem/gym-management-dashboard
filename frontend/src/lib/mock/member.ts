export type Member = {
  id: number;
  full_name: string;
  phone: string;
  email: string;


  activePlan?: {
    id: number;
    name: string;
  } | null;
};

let members: Member[] = [
  {
    id: 1,
    full_name: "John Doe",
    phone: "0712345678",
    email: "john@example.com",
    activePlan: null,
  },
  {
    id: 2,
    full_name: "Jane Doe",
    phone: "0798765432",
    email: "jane@example.com",
    activePlan: null,
  },
];

export const getMembers = async () => {
  return members;
};

export const addMember = async (member: Omit<Member, "id">) => {
  const newMember: Member = {
    id: Date.now(),
    ...member,
    activePlan: null,
  };

  members.push(newMember);
  return newMember;
};

export const updateMember = async (id: number, updated: Partial<Member>) => {
  members = members.map((m) =>
    m.id === id ? { ...m, ...updated } : m
  );
};