import { apiClient } from "./client";

export const getMemberAttendance = async (memberId) => {
  const res = await apiClient(`/attendance/member/${memberId}`);
  return res.data;
};