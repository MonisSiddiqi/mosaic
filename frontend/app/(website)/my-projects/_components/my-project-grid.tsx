"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusConfig } from "@/lib/utils";
import { useProjectsQuery } from "@/queries/projects.queries";
import { useAuth } from "@/hooks/use-auth";
import { MyProjectsCard } from "./my-project-card";

export function ProjectsGrid() {
  const { user } = useAuth();

  const { data: projects } = useProjectsQuery();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects?.list.map((project) => {
        return <MyProjectsCard {...project} key={project.id} />;
      })}
    </div>
  );
}
