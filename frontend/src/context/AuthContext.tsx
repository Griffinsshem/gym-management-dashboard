"use client";

import { createContext, useContext, useEffect, useState } from "react";

type UserType = {
  id: number;
  email: string;
  member_id: number;
  role: "admin" | "staff" | "member";
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  setUser: (user: UserType | null) => void;
  login: (data: { token: string; user: UserType }) => void;
  logout: () => void;
  isAdmin: boolean;
  isStaff: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = ({ token, user }: { token: string; user: UserType }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setToken(null);

    window.location.href = "/login";
  };

  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff";

  return (
    <AuthContext.Provider
      value={{ user, token, setUser, login, logout, isAdmin, isStaff }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};