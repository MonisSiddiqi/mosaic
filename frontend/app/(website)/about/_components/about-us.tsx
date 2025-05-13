import AboutImage from "@/app/assets/about-page.png";
import { Copy } from "../../_components/copy";
import Image from "next/image";
import { MailIcon, PhoneIcon } from "lucide-react";

export function AboutSection() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* Content Column */}
      <div className="max-w-xl">
        <h1 className="mb-8 text-[48px] font-bold">About Us</h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-700">
          Crafty Future is a modern platform designed to connect homeowners with
          skilled trade professionals for all types of home projects—from small
          repairs to full-scale renovations.
          <br />
          We’re building a smarter way to match the right jobs with the right
          pros—no bidding wars, no spam leads, just quality connections.
        </p>

        {/* Contact Box */}
        <div className="w-fit space-y-4 rounded-lg bg-white p-6">
          <div className="flex items-center gap-3 text-gray-700">
            <MailIcon className="size-5" />
            <span>info@mosaic.com</span>
            <Copy textToCopy="info@mosaic.com" label="email" />
          </div>
          <div className="flex items-center gap-3">
            <PhoneIcon className="size-5" />
            <span>+1256321452</span>
            <Copy textToCopy="+1256321452" label="phone number" />
          </div>
        </div>
      </div>

      {/* Image Column */}
      <div className="relative h-[600px] bg-gray-100">
        <Image
          src={AboutImage.src}
          width={AboutImage.width}
          height={AboutImage.height}
          alt="Modern interior with furniture and decor"
          className="h-full w-full rounded-lg object-cover"
        />
      </div>

      <section className="col-span-2 w-full rounded-md bg-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 text-3xl font-bold">
              Already Gaining Momentum
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-2 text-lg font-semibold">Featured in</p>
                <p>Michigan Home Builders Association Magazine</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-2 text-lg font-semibold">100+</p>
                <p>professionals pre-subscribed</p>
              </div>
              <div className="rounded-lg bg-gray-50 p-6">
                <p className="mb-2 text-lg font-semibold">Backed by builders</p>
                <p>Designed for the future</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
