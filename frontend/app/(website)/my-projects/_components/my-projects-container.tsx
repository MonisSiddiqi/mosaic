"use client";

import { useAuth } from "@/hooks/use-auth";
import { ProjectsGrid } from "./my-project-grid";
import { ProjectsHeader } from "./my-project-header";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderComponent } from "@/components/loader-component";

export const MyProjectsContainer = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?redirect=/my-projects");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <LoaderComponent showText className="size-full" />;
  }

  return (
    <>
      <ProjectsHeader query={query} setQuery={setQuery} />
      {query && (
        <p className="mb-4 text-gray-500">
          Showing results for{" "}
          <span className="text-gray-800"> &quot;{query}&quot;</span>
        </p>
      )}
      <ProjectsGrid query={query} setQuery={setQuery} />
    </>
  );
};
