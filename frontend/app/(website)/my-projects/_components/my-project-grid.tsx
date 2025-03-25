"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusConfig } from "@/lib/utils";
import { useProjectsQuery } from "@/queries/projects.queries";
import { useAuth } from "@/hooks/use-auth";

export function ProjectsGrid() {
  const { user } = useAuth();

  const { data: projects } = useProjectsQuery();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects?.list.map((project) => {
        const statusConfig = getStatusConfig(project.status);

        return (
          <Link key={project.id} href={`/my-projects`}>
            <Card className="overflow-hidden transition-shadow hover:shadow-lg">
              {/* <div className="relative h-[240px]">
                <Image
                  src={project.addressId as string}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute right-4 top-4">
                  <Badge className={statusConfig.className}>
                    {statusConfig.label}
                  </Badge>
                </div>
              </div> */}
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-gray-500">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
