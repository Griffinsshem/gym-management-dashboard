import { apiClient } from "./api";

export const loginUser = async (email: string, password: string) => {
  const res = await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  localStorage.setItem("token", res.data.access_token);

  return res.data;
};