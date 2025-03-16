"use client";

import { useServicesQuery } from "@/queries/services.queries";
import { ServiceCard } from "./service-card";

export const ServicesContainer = () => {
  const { data } = useServicesQuery();

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {data?.list.map((service) => (
        <ServiceCard
          key={service.name}
          id={service.id}
          iconUrl={service.iconUrl}
          title={service.name}
          description={service.description}
        />
      ))}
    </div>
  );
};
