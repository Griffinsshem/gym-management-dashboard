import { useEffect, useState } from "react";
import { getMemberAttendance } from "../api/attendance";
import Navbar from "../components/Navbar";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Clock, LogIn, LogOut } from "lucide-react";

const Attendance = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    const data = await getMemberAttendance(3);
    setRecords(data);
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Clock size={20} /> Attendance
        </h2>

        <div className="flex gap-3 mb-6">
          <Button>
            <LogIn size={16} /> Check In
          </Button>

          <Button variant="danger">
            <LogOut size={16} /> Check Out
          </Button>
        </div>

        <div className="grid gap-4">
          {records.map((r) => (
            <Card key={r.id}>
              <p><strong>Check-in:</strong> {r.check_in_time}</p>
              <p><strong>Check-out:</strong> {r.check_out_time}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;