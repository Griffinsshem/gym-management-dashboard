type Props = {
  data: any[];
};

export default function AttendanceTable({ data }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mt-6">
      <h3 className="text-lg font-semibold mb-4">Attendance</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm">
            <th>ID</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              <td>{item.id}</td>
              <td>{item.check_in_time}</td>
              <td>{item.check_out_time || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}