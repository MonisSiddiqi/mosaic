"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { NotificationsContainer } from "./-components/notification-container";
import { DefaultErrorPage } from "@/components/default-error-page";
import { LoaderComponent } from "@/components/loader-component";

export default function Page() {
  return (
    <ErrorBoundary resetKeys={[]} FallbackComponent={DefaultErrorPage}>
      <Suspense fallback={<LoaderComponent />}>
        <NotificationsContainer />
      </Suspense>
    </ErrorBoundary>
  );
}
