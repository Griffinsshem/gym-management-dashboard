import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "GymPro",
  description: "Premium gym management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}

          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}