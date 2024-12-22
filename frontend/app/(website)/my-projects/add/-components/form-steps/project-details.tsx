import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import PlumbingIcon from "@/app/assets/plumbing-icon.svg";
import ElectricianIcon from "@/app/assets/electrician-icon.svg";
import FencingIcon from "@/app/assets/fencing-icon.svg";
import PaintingIcon from "@/app/assets/painting-icon.svg";
import AcIcon from "@/app/assets/ac-icon.svg";
import CleaningIcon from "@/app/assets/cleaning-icon.svg";
import TreeIcon from "@/app/assets/tree-icon.svg";
import RoofingIcon from "@/app/assets/roofing-icon.png";
import PestIcon from "@/app/assets/pest-icon.svg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultipleSelector from "@/components/ui/multiple-selector";

interface ProjectDetailsProps {
  updateFormData: (data: object) => void;
}

const services = [
  {
    name: "Plumbing",
    icon: PlumbingIcon,
    href: "/services/plumbing",
    description:
      "Professional plumbing services for repairs, installations, and maintenance.",
  },
  {
    name: "Electrical",
    icon: ElectricianIcon,
    href: "/services/electrical",
    description:
      "Expert electrical solutions, from wiring to appliance installations.",
  },
  {
    name: "Fencing",
    icon: FencingIcon,
    href: "/services/fencing",
    description:
      "Durable and stylish fencing solutions for privacy and security.",
  },
  {
    name: "Painting",
    icon: PaintingIcon,
    href: "/services/painting",
    description:
      "High-quality painting services for interior and exterior spaces.",
  },
  {
    name: "Heating & Cooling",
    icon: AcIcon,
    href: "/services/hvac",
    description:
      "Comprehensive heating and cooling services to maintain indoor comfort.",
  },
  {
    name: "Cleaning",
    icon: CleaningIcon,
    href: "/services/cleaning",
    description:
      "Reliable cleaning services to keep your spaces spotless and fresh.",
  },
  {
    name: "Tree Service",
    icon: TreeIcon,
    href: "/services/tree-service",
    description:
      "Tree trimming, removal, and maintenance services for healthy landscapes.",
  },
  {
    name: "Roofing",
    icon: RoofingIcon,
    href: "/services/roofing",
    description:
      "Roofing repair, installation, and inspection services for your home or business.",
  },
  {
    name: "Pest Control",
    icon: PestIcon,
    href: "/services/pest-control",
    description:
      "Effective pest control solutions to protect your property and health.",
  },
];

const tags = [
  { label: "Bathroom Remodel", value: "Bathroom Remodel" },
  { label: "Roofing", value: "Roofing" },
  { label: "Driveways", value: "Driveways" },
  { label: "Tree Service", value: "Tree Service" },
  { label: "Cleaning Service", value: "Cleaning Service" },
  { label: "Fencing", value: "Fencing" },
  { label: "Painting", value: "Painting" },
  { label: "Handyman", value: "Handyman" },
  { label: "Plumbing", value: "Plumbing" },
  { label: "Electrical", value: "Electrical" },
  { label: "Kitchen Remodel", value: "Kitchen Remodel" },
  { label: "Gutter Cleaning", value: "Gutter Cleaning" },
  { label: "Pest Control", value: "Pest Control" },
  { label: "Window Repair", value: "Window Repair" },
  { label: "Heating & Cooling", value: "Heating & Cooling" },
  { label: "Holiday Lighting", value: "Holiday Lighting" },
  { label: "Carpentry", value: "Carpentry" },
  { label: "Flooring", value: "Flooring" },
  { label: "Landscaping", value: "Landscaping" },
  { label: "Garage Door Repair", value: "Garage Door Repair" },
];

export function ProjectDetails({ updateFormData }: ProjectDetailsProps) {
  const handleChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Title of Project"
          onChange={(e) => handleChange("title", e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-500">
          Enter the title of your project
        </p>
      </div>
      <div>
        <Label htmlFor="service">Service</Label>
        <Select onValueChange={(value) => handleChange("service", value)}>
          <SelectTrigger id="service">
            <SelectValue placeholder="Select Service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service.name} value={service.name}>
                {service.name}
              </SelectItem>
            ))}
            <SelectItem value={"other"}>{"Other"}</SelectItem>
          </SelectContent>
        </Select>
        <p className="mt-1 text-sm text-gray-500">
          Select the service under which your project falls
        </p>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Enter a description..."
          className="h-44"
          onChange={(e) => handleChange("description", e.target.value)}
        />
        <p className="mt-1 text-sm text-gray-500">Tell us about the project</p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="tags">Tags</Label>
        <MultipleSelector
          className="flex min-h-12 max-w-full items-center"
          defaultOptions={tags}
          placeholder="Select ..."
          emptyIndicator={
            <p className="text-center text-gray-600">No Category found.</p>
          }
          creatable
        />
        <p className="mt-1 text-sm text-gray-500">
          Select the tags under which your project falls
        </p>
      </div>
    </div>
  );
}
