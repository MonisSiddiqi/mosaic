"use client";

import { LoginHistoryTable } from "./_components/table/table";

export default function LoginHistory() {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-5 py-6">
      <LoginHistoryTable />
    </div>
  );
}
