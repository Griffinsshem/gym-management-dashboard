type Props = {
  data: any[];
};

export default function AttendanceTable({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Attendance</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2 text-left">ID</th>
            <th className="py-2 text-left">Check In</th>
            <th className="py-2 text-left">Check Out</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="py-3">{item.id}</td>
              <td>{item.check_in_time}</td>
              <td className="text-gray-500">
                {item.check_out_time || "Active"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}