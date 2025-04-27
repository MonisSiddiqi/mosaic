"use client";

import { useServicesQuery } from "@/queries/services.queries";
import { ServiceCard } from "./service-card";
import { Search } from "@/app/-components/search";
import { useState } from "react";
import { ProjectCardSkeleton } from "./service-card.skeleton";
import { EmptySearch } from "@/app/-components/empty-search";

export const ServicesContainer = () => {
  const [query, setQuery] = useState("");

  const { data, isLoading } = useServicesQuery({
    filter: [{ id: "name", value: query }],
  });

  return (
    <>
      <Search query={query} setQuery={setQuery} />
      {query && (
        <div className="mb-8 text-gray-400">
          Search results for{" "}
          <span className="text-primary">&quot{query}&quot</span>{" "}
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <ProjectCardSkeleton key={index} />
          ))
        ) : data && data?.list.length > 0 ? (
          data?.list.map((service) => (
            <ServiceCard
              key={service.name}
              id={service.id}
              iconUrl={service.iconUrl}
              title={service.name}
              description={service.description}
            />
          ))
        ) : (
          <EmptySearch className="h-60 md:col-span-2 lg:col-span-3" />
        )}
      </div>
    </>
  );
};
