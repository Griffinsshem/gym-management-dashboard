import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

// Attach token automatically
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});