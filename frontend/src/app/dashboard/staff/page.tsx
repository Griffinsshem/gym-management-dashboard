"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Shield,
  UserPlus,
  Users,
  Mail,
  Search,
  Loader2,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type StaffUser = {
  id: number;
  email: string;
  role: string;
  is_active?: boolean;
  created_at?: string;
};

export default function StaffManagementPage() {
  const [staff, setStaff] = useState<StaffUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  const [search, setSearch] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchStaff = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/api/v1/users/staff`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStaff(res.data.data || []);
    } catch (err) {
      console.error("FETCH STAFF ERROR:", err);

      setError("Failed to fetch staff accounts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);


  const handleCreateStaff = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    try {
      setCreating(true);

      await axios.post(
        `${API_URL}/api/v1/users/staff`,
        {
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Staff account created successfully");

      setEmail("");
      setPassword("");

      fetchStaff();
    } catch (err: any) {
      console.error("CREATE STAFF ERROR:", err);

      setError(
        err?.response?.data?.error ||
        "Failed to create staff account"
      );
    } finally {
      setCreating(false);
    }
  };


  const filteredStaff = useMemo(() => {
    return staff.filter((s) =>
      s.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [staff, search]);

  const activeCount = staff.filter(
    (s) => s.is_active !== false
  ).length;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Staff Management
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Create and manage gym staff accounts
          </p>
        </div>

        <button
          onClick={fetchStaff}
          className="flex items-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 transition px-4 py-2 rounded-xl text-sm font-medium text-gray-700 shadow-sm"
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Staff
              </p>

              <h2 className="text-3xl font-bold text-gray-900 mt-1">
                {staff.length}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users className="text-blue-600" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Active Staff
              </p>

              <h2 className="text-3xl font-bold text-green-600 mt-1">
                {activeCount}
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Shield className="text-green-600" size={22} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Admin Controlled
              </p>

              <h2 className="text-xl font-bold text-gray-900 mt-1">
                Secure Access
              </h2>
            </div>

            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <UserPlus className="text-purple-600" size={22} />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* CREATE FORM */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">

          <div className="flex items-center gap-2 mb-6">
            <UserPlus className="text-blue-600" size={20} />

            <h2 className="text-lg font-semibold text-gray-900">
              Create Staff Account
            </h2>
          </div>

          <form
            onSubmit={handleCreateStaff}
            className="space-y-4"
          >

            {/* EMAIL */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Staff Email
              </label>

              <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <Mail
                  size={16}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="staff@gym.com"
                  className="flex-1 outline-none bg-transparent ml-2 text-sm"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Temporary Password
              </label>

              <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
                <input
                  type={
                    showPassword ? "text" : "password"
                  }
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Minimum 8 characters"
                  className="flex-1 outline-none bg-transparent text-sm"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      size={18}
                      className="text-gray-400"
                    />
                  ) : (
                    <Eye
                      size={18}
                      className="text-gray-400"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* SUCCESS */}
            {success && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl">
                <CheckCircle2 size={16} />
                {success}
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={creating}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {creating ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create Staff Account
                </>
              )}
            </button>
          </form>
        </div>

        {/* STAFF TABLE */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* TOP */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Staff Accounts
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                All registered staff users
              </p>
            </div>

            {/* SEARCH */}
            <div className="flex items-center bg-gray-100 rounded-xl px-3 py-2 w-full md:w-72">
              <Search
                size={16}
                className="text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search staff..."
                className="bg-transparent outline-none ml-2 flex-1 text-sm"
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2
                  size={28}
                  className="animate-spin text-blue-600"
                />
              </div>
            ) : filteredStaff.length === 0 ? (
              <div className="text-center py-20">
                <Users
                  size={40}
                  className="mx-auto text-gray-300 mb-3"
                />

                <p className="text-gray-500">
                  No staff accounts found
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500 tracking-wide">
                  <tr>
                    <th className="text-left px-6 py-4">
                      Staff
                    </th>

                    <th className="text-left px-6 py-4">
                      Role
                    </th>

                    <th className="text-left px-6 py-4">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStaff.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">

                          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                            {user.email
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <p className="font-medium text-gray-900">
                              {user.email}
                            </p>

                            <p className="text-xs text-gray-500">
                              ID #{user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 capitalize">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}