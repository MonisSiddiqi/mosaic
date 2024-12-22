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

import Project1BeforeImage from "@/app/assets/project-1-before-picture.png";
import Project1AfterImage from "@/app/assets/project-1-after-image.jpg";
import Project2BeforeImage from "@/app/assets/project-1-before-picture.png";
import Project2AfterImage from "@/app/assets/project-1-after-image.jpg";
import { Badge } from "@/components/ui/badge";

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
      "Experience the remarkable transformation as we breathe new life into outdated spaces, turning them into modern, functional, and visually stunning environments.",
    beforeImage: Project1BeforeImage.src,
    afterImage: Project1AfterImage.src,
  },
  {
    id: 2,
    title: "Structural Excellence",
    description:
      "Discover how we transform outdated spaces into modern, functional environments. Through innovative design and expert craftsmanship, we reimagine every detail.",
    beforeImage: Project2BeforeImage.src,
    afterImage: Project2AfterImage.src,
  },
];

export function ProjectShowcaseSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = projects.length;

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
          <div className="space-y-6 px-4 lg:col-span-4">
            <h2 className="text-[40px] font-bold text-[#1e3a8a]">
              Projects we have done
            </h2>
            <h3 className="text-[32px] text-[#94a3b8]">
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
              <CarouselContent>
                {projects.map((project) => (
                  <CarouselItem key={project.id}>
                    <Card className="border-none bg-transparent">
                      <CardContent className="p-0">
                        <div className="space-y-8">
                          {/* Before/After Images */}
                          <div className="grid gap-6 md:grid-cols-2">
                            <div className="relative aspect-[4/3]">
                              <Image
                                src={project.beforeImage}
                                alt={`${project.title} Before`}
                                fill
                                className="object-cover"
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
                                src={project.afterImage}
                                alt={`${project.title} After`}
                                fill
                                className="object-cover"
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
                          <div className="space-y-4">
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
                ))}
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
