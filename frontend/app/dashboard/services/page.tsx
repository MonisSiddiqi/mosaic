"use client";

import { useAuth } from "@/hooks/use-auth";
import { VendorServicePage } from "./_components/services-vendor-page";
import { ServicesTable } from "./_components/table/services-table";

export default function ServicePage() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-5 py-6">
      {user?.role === "ADMIN" ? <ServicesTable /> : <VendorServicePage />}
    </div>
  );
}
