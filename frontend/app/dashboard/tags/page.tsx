"use client";

import { useAuth } from "@/hooks/use-auth";
import { VendorTagsPage } from "./_components/vendor-tags-page";
import { TagsTable } from "./_components/table/tags-table";

export default function ServicePage() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col gap-4 rounded bg-white p-5 py-6">
      {user?.role === "ADMIN" ? <TagsTable /> : <VendorTagsPage />}
    </div>
  );
}
