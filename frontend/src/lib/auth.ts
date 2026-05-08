import { apiClient } from "./api";

export const loginUser = async (
  email: string,
  password: string
) => {
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

  return res.data.data;
};

export const registerUser = async (
  email: string,
  password: string
) => {
  const res = await apiClient.post(
    "/auth/register",
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

  return res.data.data;
};