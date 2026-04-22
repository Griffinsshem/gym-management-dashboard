import { apiClient } from "./api";

export const loginUser = async (email: string, password: string) => {
  const res = await apiClient.post(
    "/auth/login",
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};