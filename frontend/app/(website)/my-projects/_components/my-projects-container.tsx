"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProjectsGrid } from "./my-project-grid";
import { ProjectsHeader } from "./my-project-header";
import { redirect } from "next/navigation";

export const MyProjectsContainer = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return (
      <>
        <ProjectsHeader />
        <ProjectsGrid />
      </>
    );
  } else {
    redirect("/auth?redirect=/my-projects");
  }
};
