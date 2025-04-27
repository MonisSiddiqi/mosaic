"use client";

import { useProjectsQuery } from "@/queries/projects.queries";
import { MyProjectsCard } from "./my-project-card";

export function ProjectsGrid() {
  const { data: projects } = useProjectsQuery();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects?.list.map((project) => {
        return <MyProjectsCard {...project} key={project.id} />;
      })}
    </div>
  );
}
