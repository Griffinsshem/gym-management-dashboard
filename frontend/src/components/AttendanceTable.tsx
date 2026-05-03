type Props = {
  data: any[];
};

export default function AttendanceTable({ data }: Props) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  if (!data.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-400 text-sm">
        No attendance records yet
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wide">
          <tr>
            <th className="p-4 text-left">Session</th>
            <th className="p-4 text-left">Check In</th>
            <th className="p-4 text-left">Check Out</th>
            <th className="p-4 text-left">Status</th>
          </tr>
        </thead>

        <tbody className="text-gray-700">
          {data.map((item) => {
            const isActive = !item.check_out_time;

            return (
              <tr
                key={item.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Session */}
                <td className="p-4 font-medium text-gray-900">
                  #{item.id}
                </td>

                {/* Check In */}
                <td className="p-4">
                  {formatDate(item.check_in_time)}
                </td>

                {/* Check Out */}
                <td className="p-4">
                  {item.check_out_time
                    ? formatDate(item.check_out_time)
                    : "-"}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium
                    ${isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                      }`}
                  >
                    {isActive ? "Active" : "Completed"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}