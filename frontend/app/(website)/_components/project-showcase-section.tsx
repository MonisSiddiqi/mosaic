"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Revitalized Spaces",
    description:
      "Experience the remarkable transformation as we breathe new life into outdated spaces, turning them into modern, functional, and visually stunning environments. With a meticulous eye for detail and a commitment to excellence, we reimagine and redesign every corner to reflect contemporary aesthetics and enhanced usability. Whether it's upgrading interiors with sleek designs.",
    beforeImage: "/projects/interior-before.jpg",
    afterImage: "/projects/interior-after.jpg",
  },
  {
    id: 2,
    title: "Structural Excellence",
    description:
      "Discover how we transform outdated spaces into modern, functional environments. Through innovative design and expert craftsmanship, we reimagine every detail, creating spaces that blend contemporary aesthetics with practicality. Our projects elevate living and working experiences, turning unremarkable areas into inspiring, elegant, and highly efficient spaces.",
    beforeImage: "/projects/exterior-before.jpg",
    afterImage: "/projects/exterior-after.jpg",
  },
];

export function ProjectShowcaseSection() {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Text Content */}
          <div className="lg:col-span-4 space-y-6 px-4">
            <h2 className="text-[40px] font-bold text-[#1e3a8a]">
              Projects we have done
            </h2>
            <h3 className="text-[32px] text-[#94a3b8]">
              Discover our recent work
            </h3>
            <p className="text-[#94a3b8] leading-relaxed text-lg">
              Our team is dedicated to delivering outstanding results in every
              project we undertake. From initial concept to final completion, we
              prioritize quality, precision, and client satisfaction. Each
              project reflects our commitment to excellence. Take a look at some
              of our recent achievements that showcase our expertise and
              innovation.
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              <Button
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-none bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 border-none"
                onClick={() =>
                  document.querySelector(".carousel-prev")?.click()
                }
              >
                <ChevronLeft className="h-8 w-8 text-white" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-16 h-16 rounded-none bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 border-none"
                onClick={() =>
                  document.querySelector(".carousel-next")?.click()
                }
              >
                <ChevronRight className="h-8 w-8 text-white" />
              </Button>
            </div>
          </div>

          {/* Carousel */}
          <div className="lg:col-span-8">
            <Carousel className="w-full">
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.id}>
                    <Card className="bg-transparent border-none">
                      <CardContent className="p-0">
                        <div className="space-y-8">
                          {/* Before/After Images */}
                          <div className="grid grid-cols-2 gap-6">
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={project.beforeImage}
                                alt={`${project.title} Before`}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={project.afterImage}
                                alt={`${project.title} After`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className="space-y-4">
                            <h3 className="text-[28px] font-semibold text-[#1e3a8a]">
                              {project.title}
                            </h3>
                            <p className="text-[#94a3b8] text-lg leading-relaxed">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
