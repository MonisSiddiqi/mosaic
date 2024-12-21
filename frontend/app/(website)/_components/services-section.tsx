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

import ServicesSectionImage from "@/app/assets/services-section.webp";

const services = [
  {
    name: "Plumbing",
    icon: PlumbingIcon,
    href: "/services/plumbing",
  },
  {
    name: "Electrical",
    icon: ElectricianIcon,
    href: "/services/electrical",
  },
  {
    name: "Fencing",
    icon: FencingIcon,
    href: "/services/fencing",
  },
  {
    name: "Painting",
    icon: PaintingIcon,
    href: "/services/painting",
  },
  {
    name: "Heating & Cooling",
    icon: AcIcon,
    href: "/services/hvac",
  },
  {
    name: "Cleaning",
    icon: CleaningIcon,
    href: "/services/cleaning",
  },
  {
    name: "Tree Service",
    icon: TreeIcon,
    href: "/services/tree-service",
  },
  {
    name: "Roofing",
    icon: RoofingIcon,
    href: "/services/roofing",
  },
  {
    name: "Pest Control",
    icon: PestIcon,
    href: "/services/pest-control",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-24 items-start">
          {/* Services Grid */}
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Our Services at your <br /> doorstep
            </h2>
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block group"
                  >
                    <Card className="p-4 border-none shadow-none text-center hover:bg-gray-50 transition-colors ">
                      <div className="bg-gray-50 rounded-lg p-4 mb-3 group-hover:bg-white transition-colors">
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
            <div className="mt-6 text-center flex justify-end">
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
          <div className="w-full h-full overflow-hidden">
            <Image
              width={300}
              height={600}
              className="object-cover w-full h-full"
              src={ServicesSectionImage.src}
              alt="@Services"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
