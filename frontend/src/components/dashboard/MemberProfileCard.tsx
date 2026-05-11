"use client";

type Props = {
  user: {
    id?: number;
    full_name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    date_of_birth?: string;
    member_id?: number;
    role?: string;
  } | null;
};

export default function MemberProfileCard({ user }: Props) {
  const formatLabel = (value?: string | number | null) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }
    return value;
  };

  const formatDate = (date?: string) => {
    if (!date) return "N/A";

    try {
      return new Date(date).toLocaleDateString();
    } catch {
      return "N/A";
    }
  };

  const fields = [
    {
      label: "Full Name",
      value: formatLabel(user?.full_name),
    },
    {
      label: "Email",
      value: formatLabel(user?.email),
    },
    {
      label: "Phone",
      value: formatLabel(user?.phone),
    },
    {
      label: "Gender",
      value: formatLabel(user?.gender),
    },
    {
      label: "Date of Birth",
      value: formatDate(user?.date_of_birth),
    },
    {
      label: "Member ID",
      value: user?.member_id
        ? `#${user.member_id}`
        : "N/A",
    },
    {
      label: "Role",
      value: user?.role
        ? user.role.charAt(0).toUpperCase() +
        user.role.slice(1)
        : "N/A",
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">
        My Profile
      </h3>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        {fields.map((field) => (
          <div key={field.label}>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {field.label}
            </p>
            <p className="text-sm font-medium text-gray-900 mt-1">
              {field.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}