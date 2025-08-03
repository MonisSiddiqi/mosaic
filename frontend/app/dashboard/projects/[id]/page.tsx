"use client";

import { ProjectDetails } from "@/app/(website)/my-projects/[id]/_components/project-details";
import { DefaultErrorPage } from "@/components/default-error-page";
import { ErrorBoundary } from "react-error-boundary";

const Page = () => {
  return (
    <ErrorBoundary FallbackComponent={DefaultErrorPage}>
      <ProjectDetails />
    </ErrorBoundary>
  );
};

export default Page;
