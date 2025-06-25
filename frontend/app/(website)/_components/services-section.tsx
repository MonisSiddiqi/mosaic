"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import ServicesSectionImage from "@/app/assets/services-section.svg";
import { useServicesQuery } from "@/queries/services.queries";
import { getInitials } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyUI } from "@/components/empty-ui";

export function ServicesSection() {
  const { data: services } = useServicesQuery();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid items-start gap-24 lg:grid-cols-2">
          {/* Services Grid */}
          <div>
            <h2 className="mb-8 text-4xl font-bold">
              Our Services at your <br /> doorstep
            </h2>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <ScrollArea type="auto">
                <div className="grid h-[30rem] gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {services?.list.length ? (
                    services?.list.map((service) => (
                      <Link
                        key={service.name}
                        href={`/my-projects/add?service=${service.id}`}
                        className="group block"
                      >
                        <Card className="border-none p-4 text-center shadow-none transition-colors hover:bg-gray-50">
                          <div className="mb-3 rounded-lg bg-gray-50 p-4 transition-colors group-hover:bg-white">
                            {service.iconUrl ? (
                              <Image
                                src={service.iconUrl}
                                alt={service.name}
                                width={50}
                                height={50}
                                className="mx-auto"
                              />
                            ) : (
                              <div className="mx-auto flex size-12 items-center justify-center rounded bg-muted text-lg font-semibold text-gray-700">
                                {getInitials(service.name)}
                              </div>
                            )}
                          </div>
                          <span className="font-medium">{service.name}</span>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <EmptyUI text="No service available" />
                  )}
                </div>
              </ScrollArea>
            </div>
            <div className="mt-6 flex justify-end text-center">
              <Button
                asChild
                size="lg"
                className="bg-gray-800 hover:bg-gray-700"
              >
                <Link href="/services">
                  Go to Services Page <span className="ml-2">→</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Service Images */}
          <div className="h-full w-full overflow-hidden">
            <Image
              width={300}
              height={600}
              className="h-full w-full object-cover"
              src={ServicesSectionImage.src}
              alt="@Services"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
