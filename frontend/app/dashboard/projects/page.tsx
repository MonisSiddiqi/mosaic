"use client";

import { ProjectsTable } from "./_components/table/projects-table";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-4 rounded bg-white p-5 py-6">
      <ProjectsTable />
    </div>
  );
}
