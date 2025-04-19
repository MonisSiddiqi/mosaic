"use client";

import { useServicesQuery } from "@/queries/services.queries";
import { VendorServiceCard } from "./vendor-service-card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ServiceCardSkeleton } from "./skeleton/service-card-skeleton";

export const VendorServicePage = () => {
  const [search, setSearch] = useState("");

  const { data: services, isLoading } = useServicesQuery({
    sorting: [{ id: "vendor", desc: true }],
    filter: [{ id: "name", value: search }],
  });

  return (
    <div className="container mx-auto">
      <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row">
        <div>
          <h1 className="text-3xl font-bold">Manage Your Services</h1>
          <p className="mt-2 text-muted-foreground">
            Toggle the services you provide to receive relevant bid requests.
          </p>
        </div>
        <div className="h-fit w-full rounded border-8 border-white bg-muted p-2 shadow lg:w-fit lg:p-5">
          <div className="flex w-full flex-col gap-4 md:flex-row lg:w-fit">
            <div className="relative w-full lg:w-fit">
              <div className="w-full lg:w-fit">
                <SearchIcon className="absolute left-2 top-2 size-5 text-gray-500" />
                <Input
                  placeholder="Search service"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="w-full bg-white pl-9 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-ring lg:w-80"
                />
              </div>
            </div>

            {search ? (
              <Button
                onClick={() => setSearch("")}
                variant={"ghost"}
                className="ml-auto w-20 border border-white"
              >
                <XIcon className="size-5" />
                Clear
              </Button>
            ) : (
              <Button className="ml-auto w-20">Search</Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? Array(10)
              .fill(null)
              .map((item, index) => <ServiceCardSkeleton key={index} />)
          : services?.list.map((service) => (
              <VendorServiceCard key={service.id} service={service} />
            ))}
      </div>

      {services?.list.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="text-xl font-medium">No services available</h3>
          <p className="mt-2 text-muted-foreground">
            There are currently no services available to add to your profile.
          </p>
        </div>
      )}
    </div>
  );
};
