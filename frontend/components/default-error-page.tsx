"use client";

import { FC } from "react";
import { FallbackProps } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftIcon,
  HomeIcon,
  RefreshCwIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export const DefaultErrorPage: FC<FallbackProps> = ({ error }) => {
  const router = useRouter();

  const { isAuthenticated, user } = useAuth();

  const goHome = () => {
    if (isAuthenticated) {
      if (user?.role === "USER") {
        router.push("/");
      } else {
        router.push("/dashboard");
      }
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex size-full h-[calc(100vh-8rem)] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <TriangleAlertIcon className="size-10 min-w-10" strokeWidth={3} />
            <h1 className="text-5xl font-semibold"> Error</h1>
          </div>
          <p className="mt-4 text-center font-medium text-gray-600">
            An error occurred while loading the page.
          </p>
          {error && (
            <p className="text-destructive">
              {JSON.stringify(error.message, null, 2)}
            </p>
          )}
        </div>

        <div className="mt-4 flex gap-4">
          <Button
            onClick={() => window.location.reload()}
            size={"sm"}
            variant={"outline"}
          >
            <RefreshCwIcon /> Refresh
          </Button>

          <Button
            onClick={() => router.push("..")}
            size={"sm"}
            variant={"outline"}
          >
            <ArrowLeftIcon /> Go Back
          </Button>

          <Button variant={"outline"} onClick={goHome} size={"sm"}>
            <HomeIcon /> Go Home
          </Button>
        </div>
      </div>
    </div>
  );
};
