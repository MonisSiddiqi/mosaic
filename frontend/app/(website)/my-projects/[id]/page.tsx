"use client";

import { DefaultErrorPage } from "@/components/default-error-page";
import { ProjectDetails } from "./_components/project-details";
import { ErrorBoundary } from "react-error-boundary";
import { PageContainer } from "../../_components/page-container";

export default function ProjectDetailsPage() {
  return (
    <PageContainer name="Project Details">
      <ErrorBoundary FallbackComponent={DefaultErrorPage}>
        <ProjectDetails />
      </ErrorBoundary>
    </PageContainer>
  );
}
