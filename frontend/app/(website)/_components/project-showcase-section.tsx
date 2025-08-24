"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { useProjectsQuery } from "@/queries/projects.queries";
import { LoaderComponent } from "@/components/loader-component";
import { EmptyUI } from "@/components/empty-ui";

export function ProjectShowcaseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading } = useProjectsQuery();

  const filterdProjects =
    data?.list.filter((item) => item.ProjectUpdate.length > 0) || [];

  const totalItems = filterdProjects.length;

  const carouselNextRef = useRef<HTMLButtonElement | null>(null);
  const carouselPrevRef = useRef<HTMLButtonElement | null>(null);

  const handleNext = () => {
    if (currentIndex < totalItems - 1) {
      setCurrentIndex((prev) => prev + 1);
      if (carouselNextRef.current) carouselNextRef.current.click();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      if (carouselPrevRef.current) carouselPrevRef.current.click();
    }
  };

  return (
    <section className="bg-stone-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Text Content */}
          <div className="px-4 lg:col-span-4">
            <h2 className="text-4xl font-bold text-[#1e3a8a]">
              Projects we have done
            </h2>
            <h3 className="mt-4 text-4xl text-[#94a3b8]">
              Discover our recent work
            </h3>
            <p className="text-lg leading-relaxed text-[#94a3b8]">
              Our team is dedicated to delivering outstanding results in every
              project we undertake. Each project reflects our commitment to
              excellence. Take a look at some of our recent achievements.
            </p>

            {/* Navigation Buttons */}
            <div className="mt-8 hidden gap-4 lg:flex">
              <Button
                variant="outline"
                size="lg"
                className={`h-16 w-16 rounded-none ${
                  currentIndex === 0
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-brand-primary hover:bg-brand-primary/90"
                } border-none`}
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft
                  className={`size-10 min-h-10 min-w-10 ${
                    currentIndex === 0 ? "text-gray-500" : "text-white"
                  }`}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className={`h-16 w-16 rounded-none ${
                  currentIndex === totalItems - 1
                    ? "cursor-not-allowed bg-gray-300"
                    : "bg-brand-primary hover:bg-brand-primary/90"
                } border-none`}
                onClick={handleNext}
                disabled={currentIndex === totalItems - 1}
              >
                <ChevronRight
                  className={`size-10 min-h-10 min-w-10 ${
                    currentIndex === totalItems - 1
                      ? "text-gray-500"
                      : "text-white"
                  }`}
                />
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div className="lg:col-span-8">
            <Carousel className="w-full">
              <CarouselContent className="p-2">
                {isLoading ? (
                  <LoaderComponent
                    className="flex h-full w-full items-center justify-center"
                    text="Loading Recent Projects"
                  />
                ) : filterdProjects.length > 0 ? (
                  filterdProjects?.map((project) => {
                    const projectUpdate = project.ProjectUpdate[0];

                    const beforeImage = projectUpdate.ProjectUpdateFile.find(
                      (item) => item.type === "BEFORE",
                    );
                    const afterImage = projectUpdate.ProjectUpdateFile.find(
                      (item) => item.type === "AFTER",
                    );

                    return (
                      <CarouselItem key={project.id}>
                        <Card className="border-none bg-transparent shadow-none">
                          <CardContent className="p-0">
                            <div className="space-y-8">
                              {/* Before/After Images */}
                              <div className="grid gap-6 md:grid-cols-2">
                                <div className="relative aspect-[4/3]">
                                  <Image
                                    src={beforeImage?.fileUrl as string}
                                    alt={`${project.title} Before`}
                                    fill
                                    className="bg-white object-cover"
                                  />
                                  <Badge
                                    variant={"secondary"}
                                    className="absolute left-4 top-4 hover:bg-secondary"
                                  >
                                    Before
                                  </Badge>
                                </div>
                                <div className="relative aspect-[4/3]">
                                  <Image
                                    src={afterImage?.fileUrl as string}
                                    alt={`${project.title} After`}
                                    fill
                                    className="bg-white object-cover"
                                  />
                                  <Badge
                                    variant={"secondary"}
                                    className="absolute left-4 top-4 bg-brand-gold hover:bg-brand-gold"
                                  >
                                    After
                                  </Badge>
                                </div>
                              </div>

                              {/* Project Info */}
                              <div>
                                <h3 className="text-[28px] font-semibold text-[#1e3a8a]">
                                  {project.title}
                                </h3>
                                <p className="text-lg leading-relaxed text-[#94a3b8]">
                                  {project.description}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </CarouselItem>
                    );
                  })
                ) : (
                  <EmptyUI
                    className="flex h-full w-full items-center justify-center"
                    text="No Projects to show yet"
                  />
                )}
              </CarouselContent>
              <CarouselPrevious className="hidden" ref={carouselPrevRef} />
              <CarouselNext className="hidden" ref={carouselNextRef} />
            </Carousel>
          </div>

          <div className="mt-8 flex gap-4 lg:hidden">
            <Button
              variant="outline"
              size="lg"
              className={`h-16 w-16 rounded-none ${
                currentIndex === 0
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-brand-primary hover:bg-brand-primary/90"
              } border-none`}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <ChevronLeft
                className={`size-10 min-h-10 min-w-10 ${
                  currentIndex === 0 ? "text-gray-500" : "text-white"
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`h-16 w-16 rounded-none ${
                currentIndex === totalItems - 1
                  ? "cursor-not-allowed bg-gray-300"
                  : "bg-brand-primary hover:bg-brand-primary/90"
              } border-none`}
              onClick={handleNext}
              disabled={currentIndex === totalItems - 1}
            >
              <ChevronRight
                className={`size-10 min-h-10 min-w-10 ${
                  currentIndex === totalItems - 1
                    ? "text-gray-500"
                    : "text-white"
                }`}
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
