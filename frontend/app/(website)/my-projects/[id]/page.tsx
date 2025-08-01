"use client";

import { DefaultErrorPage } from "@/components/default-error-page";
import { ProjectDetails } from "./_components/project-details";
import { ErrorBoundary } from "react-error-boundary";

export default function ProjectDetailsPage() {
  return (
    <ErrorBoundary FallbackComponent={DefaultErrorPage}>
      <ProjectDetails />
    </ErrorBoundary>
  );
}
