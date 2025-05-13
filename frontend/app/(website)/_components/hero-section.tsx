import Image from "next/image";

import HeroImage from "@/app/assets/construction-bg.avif";
import { NotifyMe } from "./notify-me";

export const HeroSection = () => {
  return (
    <div className="relative h-screen w-screen">
      <div className="absolute z-50 flex h-5/6 w-full justify-center">
        <div className="container my-auto flex flex-col justify-between px-4 md:flex-row">
          <div className="container max-w-2xl text-white">
            <p className="text-3xl font-extrabold tracking-tight md:text-5xl lg:text-5xl xl:text-6xl">
              The Smarter Way to Connect Homeowners with Skilled Trade
              Professionals.
            </p>
            <p className="mt-4 text-lg xl:text-xl">
              Real jobs. Trusted pros. No middlemen.
            </p>
            {/* <Button
              asChild
              className="mt-10 w-fit bg-brand-gold font-semibold hover:bg-brand-gold/95"
            >
              <Link href={"/my-projects/add"}>Start Your Project</Link>
            </Button> */}
          </div>
          <NotifyMe calssName="mt-5 mx-0 text-white" />
        </div>
      </div>
      <div className="relative h-full w-full">
        <Image
          width={HeroImage.width}
          height={HeroImage.height}
          src={HeroImage.src}
          className="h-full w-full object-cover"
          alt="Hero Section Image"
        />
        <div className="absolute inset-0 z-10 bg-black/70" />
      </div>
    </div>
  );
};
