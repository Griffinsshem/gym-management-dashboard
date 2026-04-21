import { apiClient } from "./api";

export const getAttendance = async (memberId: number) => {
  const res = await apiClient(`/attendance/member/${memberId}`);
  return res.data;
};