import { Member } from "@/lib/mock/member";

export default function MembersTable({
  data,
  onEdit,
  onAssign,
}: {
  data: Member[];
  onEdit: (member: Member) => void;
  onAssign: (member: Member) => void;
}) {
  return (
    <table className="w-full bg-white shadow rounded-lg">
      <thead>
        <tr className="text-left border-b text-gray-600">
          <th className="p-3">Name</th>
          <th className="p-3">Phone</th>
          <th className="p-3">Email</th>
          <th className="p-3">Actions</th>
          <th className="p-3">Plan</th>
        </tr>
      </thead>
      <tbody>
        {data.map((member) => (
          <tr key={member.id} className="border-b text-gray-700">
            <td className="p-3">{member.full_name}</td>
            <td className="p-3">{member.phone}</td>
            <td className="p-3">{member.email}</td>
            <td className="p-3 flex gap-4">

              <button
                onClick={() => onEdit(member)}
                className="text-blue-600"
              >
                Edit
              </button>


              <button
                onClick={() => onAssign(member)}
                className="text-green-600"
              >
                Assign Plan
              </button>
            </td>
            <td className="p-3">
              {member.activePlan ? (
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-sm">
                  {member.activePlan.name}
                </span>
              ) : (
                <span className="text-gray-400 text-sm">No Plan</span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}