"use client";

import { Sidebar } from "@/app/dashboard/-components/sidebar";
import { Header } from "@/app/dashboard/-components/header";
import { notFound, usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { UserRole } from "@/apis/users";
import { useEffect, useState } from "react";
import { LoaderComponent } from "@/components/loader-component";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [hideSidebar, setHideSidebar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=" + pathname);
    }
    if (user?.role === UserRole.USER) {
      notFound();
    }
  }, [isAuthenticated, router, user?.role]);

  if (!isAuthenticated) {
    return (
      <LoaderComponent className="flex h-screen w-full items-center justify-center" />
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <Sidebar hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
