"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
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
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  console.log("user ", user);

  // Handle unauthenticated and unauthorized users
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth"); // Redirect to the auth page
    } else if (user?.role !== UserRole.ADMIN) {
      notFound(); // Show a 404 page for non-admin users
    }
  }, []);

  // Show nothing (or a loading spinner) while the `useEffect` runs
  if (!isAuthenticated || user?.role !== UserRole.ADMIN) {
    return null; // Or return a loading component
  }

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <ScrollArea className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-4">
          {children}
        </ScrollArea>
      </div>
    </div>
  );
}
