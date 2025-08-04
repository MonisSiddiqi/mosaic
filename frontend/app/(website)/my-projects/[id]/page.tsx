"use client";

import { DefaultErrorPage } from "@/components/default-error-page";
import { ProjectDetails } from "./_components/project-details";
import { ErrorBoundary } from "react-error-boundary";
import { PageContainer } from "../../_components/page-container";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { LoaderComponent } from "@/components/loader-component";

export default function ProjectDetailsPage() {
  const router = useRouter();

  const params = useParams();

  const id = params.id as string;

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/my-projects/" + id);
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoaderComponent showText className="size-full" />;
  }

  return (
    <PageContainer name="Project Details">
      <ErrorBoundary FallbackComponent={DefaultErrorPage}>
        <ProjectDetails />
      </ErrorBoundary>
    </PageContainer>
  );
}
