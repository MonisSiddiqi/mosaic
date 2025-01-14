"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sidebar } from "@/app/admin/-components/sidebar";
import { Header } from "@/app/admin/-components/header";
import { UserRoleEnum } from "@/api/users";
import { notFound } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, logout } = useAuth();

  if (!user) {
    logout();
  }

  if (user?.role !== UserRoleEnum.ADMIN) {
    notFound();
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
