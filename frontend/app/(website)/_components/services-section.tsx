import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import PlumbingIcon from "@/app/assets/plumbing-icon.svg";
import ElectricianIcon from "@/app/assets/electrician-icon.svg";
import FencingIcon from "@/app/assets/fencing-icon.svg";
import PaintingIcon from "@/app/assets/painting-icon.svg";
import AcIcon from "@/app/assets/ac-icon.svg";
import CleaningIcon from "@/app/assets/cleaning-icon.svg";
import TreeIcon from "@/app/assets/tree-icon.svg";
import RoofingIcon from "@/app/assets/roofing-icon.png";
import PestIcon from "@/app/assets/pest-icon.svg";

import ServicesSectionImage from "@/app/assets/services-section.svg";

const services = [
  {
    name: "Plumbing",
    icon: PlumbingIcon,
    href: "/my-projects/add",
  },
  {
    name: "Electrical",
    icon: ElectricianIcon,
    href: "/my-projects/add",
  },
  {
    name: "Fencing",
    icon: FencingIcon,
    href: "/my-projects/add",
  },
  {
    name: "Painting",
    icon: PaintingIcon,
    href: "/my-projects/add",
  },
  {
    name: "Heating & Cooling",
    icon: AcIcon,
    href: "/my-projects/add",
  },
  {
    name: "Cleaning",
    icon: CleaningIcon,
    href: "/my-projects/add",
  },
  {
    name: "Tree Service",
    icon: TreeIcon,
    href: "/my-projects/add",
  },
  {
    name: "Roofing",
    icon: RoofingIcon,
    href: "/my-projects/add",
  },
  {
    name: "Pest Control",
    icon: PestIcon,
    href: "/my-projects/add",
  },
];

export function ServicesSection() {
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
              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="group block"
                  >
                    <Card className="border-none p-4 text-center shadow-none transition-colors hover:bg-gray-50">
                      <div className="mb-3 rounded-lg bg-gray-50 p-4 transition-colors group-hover:bg-white">
                        <Image
                          src={service.icon.src}
                          alt={service.name}
                          width={50}
                          height={50}
                          className="mx-auto"
                        />
                      </div>
                      <span className="font-medium">{service.name}</span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end text-center">
              <Button
                asChild
                size="lg"
                className="bg-gray-800 hover:bg-gray-700"
              >
                <Link href="/services">
                  Explore All Services <span className="ml-2">→</span>
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
