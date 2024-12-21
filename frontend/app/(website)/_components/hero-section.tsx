import Image from "next/image";

import HeroImage from "@/app/assets/hero.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const HeroSection = () => {
  return (
    <div className="w-screen h-screen relative">
      <div className="absolute w-full h-5/6 flex justify-center">
        <div className="container my-auto px-4">
          <div className="max-w-xl container text-white">
            <p className="font-extrabold text-4xl md:text-6xl lg:text-6xl xl:text-7xl ">
              Transform your living space with us at ease
            </p>
            <p className="text-lg xl:text-xl">
              Connect with top-rated professionals for all your home improvement
              needs
            </p>
            <Button
              asChild
              className="bg-brand-gold hover:bg-brand-gold/95 font-semibold mt-10 w-fit"
            >
              <Link href={"/add-project"}>Start Your Project</Link>
            </Button>
          </div>
        </div>
      </div>
      <Image
        width={HeroImage.width}
        height={HeroImage.height}
        src={HeroImage.src}
        className="w-full h-full object-cover"
        alt="Hero Section Image"
      />
    </div>
  );
};
