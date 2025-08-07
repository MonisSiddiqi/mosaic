"use client";

import { ErrorBoundary } from "react-error-boundary";
import { DefaultErrorPage } from "@/components/default-error-page";
import { BidHistoryPage } from "./_components/bid-history-page";

const ProjectPage = () => {
  return (
    <ErrorBoundary resetKeys={[]} FallbackComponent={DefaultErrorPage}>
      <BidHistoryPage />
    </ErrorBoundary>
  );
};

export default ProjectPage;
