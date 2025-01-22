"use client";

import { notFound } from "next/navigation";
import { ProjectsTable } from "./_components/table/projects-table";

export default function ProjectsPage() {
  notFound();
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-5 py-6">
      <ProjectsTable />
    </div>
  );
}
