import { apiClient } from "./client";

export const login = async (email, password) => {
  const res = await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  const token = res.data.access_token;
  localStorage.setItem("token", token);

  return res.data;
};