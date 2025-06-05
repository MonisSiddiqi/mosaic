"use client";

import { Sidebar } from "@/app/dashboard/-components/sidebar";
import { Header } from "@/app/dashboard/-components/header";
import { notFound, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
    if (user?.role === UserRole.USER) {
      notFound();
    }
  }, [isAuthenticated, router, user?.role]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
