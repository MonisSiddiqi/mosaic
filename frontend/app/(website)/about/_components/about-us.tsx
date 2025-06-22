import AboutImage from "@/app/assets/about-page.png";
import { Copy } from "../../_components/copy";
import Image from "next/image";
import { MailIcon, PhoneIcon } from "lucide-react";
import { ContactDetails } from "@/app/-components/contact-details";

export function AboutSection() {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* Content Column */}
      <div className="max-w-xl">
        <h1 className="mb-8 text-[48px] font-bold">About Us</h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-700">
          We are Crafty Future, We are dedicated to simplifying the process of
          finding reliable vendors for your home and commercial projects. Our
          mission is to bridge the gap between homeowners, businesses, and
          skilled professionals, ensuring that every project, big or small, gets
          the attention it deserves.
        </p>

        {/* Contact Box */}
        <ContactDetails />
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
    </div>
  );
}
