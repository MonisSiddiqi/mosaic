import PageHeader from "../_components/page-header";

import { ServiceCard } from "./-components/service-card";

import PlumbingIcon from "@/app/assets/plumbing-icon.svg";
import ElectricianIcon from "@/app/assets/electrician-icon.svg";
import FencingIcon from "@/app/assets/fencing-icon.svg";
import PaintingIcon from "@/app/assets/painting-icon.svg";
import AcIcon from "@/app/assets/ac-icon.svg";
import CleaningIcon from "@/app/assets/cleaning-icon.svg";
import TreeIcon from "@/app/assets/tree-icon.svg";
import RoofingIcon from "@/app/assets/roofing-icon.png";
import PestIcon from "@/app/assets/pest-icon.svg";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: "Plumbing",
    icon: PlumbingIcon,
    href: "/my-projects/add",
    description:
      "Professional plumbing services for repairs, installations, and maintenance.",
  },
  {
    name: "Electrical",
    icon: ElectricianIcon,
    href: "/my-projects/add",
    description:
      "Expert electrical solutions, from wiring to appliance installations.",
  },
  {
    name: "Fencing",
    icon: FencingIcon,
    href: "/my-projects/add",
    description:
      "Durable and stylish fencing solutions for privacy and security.",
  },
  {
    name: "Painting",
    icon: PaintingIcon,
    href: "/my-projects/add",
    description:
      "High-quality painting services for interior and exterior spaces.",
  },
  {
    name: "Heating & Cooling",
    icon: AcIcon,
    href: "/my-projects/add",
    description:
      "Comprehensive heating and cooling services to maintain indoor comfort.",
  },
  {
    name: "Cleaning",
    icon: CleaningIcon,
    href: "/my-projects/add",
    description:
      "Reliable cleaning services to keep your spaces spotless and fresh.",
  },
  {
    name: "Tree Service",
    icon: TreeIcon,
    href: "/my-projects/add",
    description:
      "Tree trimming, removal, and maintenance services for healthy landscapes.",
  },
  {
    name: "Roofing",
    icon: RoofingIcon,
    href: "/my-projects/add",
    description:
      "Roofing repair, installation, and inspection services for your home or business.",
  },
  {
    name: "Pest Control",
    icon: PestIcon,
    href: "/my-projects/add",
    description:
      "Effective pest control solutions to protect your property and health.",
  },
];

export default function Service() {
  return (
    <main className="w-full bg-background-secondary">
      <PageHeader title="Services" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <h1 className="mb-8 text-center text-4xl font-bold">Our Services</h1>
        <p className="mx-auto mb-12 max-w-3xl text-center text-xl text-gray-600">
          Discover our wide range of professional home services designed to meet
          all your needs. From outdoor transformations to indoor perfection, we
          have got you covered.
        </p>
        <div className="mb-6 h-fit w-full rounded border-8 border-white p-2 pb-5 shadow lg:w-fit lg:p-5">
          <div className="flex w-full gap-4 lg:w-fit">
            <div className="relative w-full lg:w-fit">
              <div className="w-full lg:w-fit">
                <SearchIcon className="absolute left-2 top-2.5 size-5" />
                <Input
                  placeholder="Search service..."
                  className="w-full pl-9 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-ring lg:w-80"
                />
              </div>
            </div>

            <Button>Search</Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.name}
              icon={service.icon.src}
              title={service.name}
              description={service.description}
              href={service.href}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
