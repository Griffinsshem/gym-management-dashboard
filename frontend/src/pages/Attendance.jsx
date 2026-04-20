import { useEffect, useState } from "react";
import { getMemberAttendance } from "../api/attendance";

const Attendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMemberAttendance(3);
        setRecords(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Attendance</h2>
      {records.map((r) => (
        <div key={r.id}>
          <p>Check-in: {r.check_in_time}</p>
          <p>Check-out: {r.check_out_time}</p>
        </div>
      ))}
    </div>
  );
};

export default Attendance;