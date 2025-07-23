import Image from "next/image";

import HeroImage from "@/app/assets/hero.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { KnowMoreCard } from "./know-more-card";

export const HeroSection = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute flex h-5/6 w-full justify-center">
        <div className="container mt-10 flex flex-col gap-10 px-4 md:mt-0 md:flex-row md:items-center md:justify-between">
          <div className="container max-w-xl text-white">
            <p className="text-4xl font-extrabold md:text-6xl lg:text-6xl xl:text-7xl">
              Transform your living space with us at ease
            </p>
            <p className="text-lg xl:text-xl">
              Connect with top-rated professionals for all your home improvement
              needs
            </p>
            <Button
              asChild
              className="mt-10 w-fit bg-brand-gold font-semibold hover:bg-brand-gold/95"
            >
              <Link href={"/my-projects/add"}>Start Your Project</Link>
            </Button>
          </div>
          <KnowMoreCard />
        </div>
      </div>
      <Image
        width={HeroImage.width}
        height={HeroImage.height}
        src={HeroImage.src}
        className="h-full w-full object-cover"
        alt="Hero Section Image"
      />
    </div>
  );
};
