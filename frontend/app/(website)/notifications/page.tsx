"use client";

import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { DefaultErrorPage } from "@/components/default-error-page";
import { LoaderComponent } from "@/components/loader-component";
import { NotificationsContainer } from "@/app/dashboard/notifications/-components/notification-container";
import { PageContainer } from "../_components/page-container";

export default function Page() {
  return (
    <PageContainer name="Notifications">
      <ErrorBoundary resetKeys={[]} FallbackComponent={DefaultErrorPage}>
        <Suspense fallback={<LoaderComponent />}>
          <NotificationsContainer />
        </Suspense>
      </ErrorBoundary>
    </PageContainer>
  );
}
