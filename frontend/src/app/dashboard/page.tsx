"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-xl font-semibold">Welcome to Dashboard</h2>
      </div>
    </div>
  );
}