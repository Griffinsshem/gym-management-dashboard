"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const PUBLIC_ROUTES = ["/", "/login", "/register"];

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const isPublic = PUBLIC_ROUTES.includes(pathname);

    if (!token && !isPublic) {
      router.push("/login");
    }

    if (
      token &&
      (pathname === "/" ||
        pathname === "/login" ||
        pathname === "/register")
    ) {
      router.push("/dashboard");
    }
  }, [token, pathname, loading, router]);

  return <>{children}</>;
}