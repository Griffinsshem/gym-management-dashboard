import { Member } from "@/lib/mock/member";

export default function MembersTable({
  data,
  onEdit,
}: {
  data: Member[];
  onEdit: (member: Member) => void;
}) {
  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="text-left border-b text-gray-600">
          <th className="p-3">Name</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Email</th>
          <th className="p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((member) => (
          <tr key={member.id} className="border-b text-gray-700">
            <td className="p-3">{member.full_name}</td>
            <td className="p-3">{member.phone}</td>
            <td className="p-3">{member.email}</td>
            <td className="p-3">
              <button
                onClick={() => onEdit(member)}
                className="text-blue-600"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}