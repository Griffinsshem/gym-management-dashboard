import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      const status = error.response?.status;

      const isAuthPage =
        window.location.pathname === "/login" ||
        window.location.pathname === "/register";

      if (status === 401 && !isAuthPage) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };