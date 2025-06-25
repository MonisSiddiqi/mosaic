"use client";

import { useProjectsQuery } from "@/queries/projects.queries";
import { MyProjectsCard } from "./my-project-card";
import { EmptyUI } from "@/components/empty-ui";

export function ProjectsGrid() {
  const { data: projects } = useProjectsQuery();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects?.list.length ? (
        projects?.list.map((project) => {
          return <MyProjectsCard {...project} key={project.id} />;
        })
      ) : (
        <EmptyUI
          text="No Project added"
          className="mt-24 md:col-span-2 lg:col-span-3"
        />
      )}
    </div>
  );
}
