"use client";

import { ServicesTable } from "./_components/table/services-table";

export default function ServicePage() {
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-5 py-6">
      <ServicesTable />
    </div>
  );
}
