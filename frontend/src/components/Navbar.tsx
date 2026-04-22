"use client";

export default function Navbar() {
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : null;

  return (
    <div className="flex justify-between items-center p-4 bg-white border-b">
      <h2 className="text-lg font-semibold text-gray-700">
        Dashboard Overview
      </h2>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
          {user?.email?.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm text-gray-600">{user?.email}</span>
      </div>
    </div>
  );
}