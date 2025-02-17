"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MapPinIcon,
  Building2Icon,
  RulerIcon,
  DollarSignIcon,
} from "lucide-react";
import { ProjectDetails } from "./form-steps/project-details";
import { Location } from "./form-steps/locations";
import { SiteMeasurements } from "./form-steps/site-measurement";
import { BudgetStep } from "./form-steps/budget";
import { AddProjectDto } from "@/apis/projects/projects.type";

const steps = [
  { title: "Project Details", icon: Building2Icon },
  { title: "Location", icon: MapPinIcon },
  { title: "Site Measurement", icon: RulerIcon },
  { title: "Budget", icon: DollarSignIcon },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AddProjectDto>({
    title: "",
    description: "",
    city: "",
    country: "",
    line1: "",
    postalCode: "",
    serviceId: "",
    state: "",
    width: "",
    height: "",
    length: "",
    area: "",
    tags: [],
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <ProjectDetails
            currentStep={currentStep}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            steps={steps}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 1:
        return (
          <Location
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            formData={formData}
            setFormData={setFormData}
          />
        );
      case 2:
        return (
          <SiteMeasurements
            formData={formData}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            setFormData={setFormData}
          />
        );
      case 3:
        return (
          <BudgetStep
            formData={formData}
            handlePrevious={handlePrevious}
            setFormData={setFormData}
          />
        );
      default:
        return null;
    }
  };

  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <div className="mx-auto max-w-4xl md:p-4">
      <div className="mb-8 flex flex-col items-start gap-6 md:flex-row md:justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center gap-4 md:flex-col">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                index === currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <step.icon className="h-5 w-5" />
            </div>
            <span
              className={`text-sm md:mt-2 ${
                index === currentStep
                  ? "font-semibold text-blue-600"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
      <Card>
        <CardHeader className="border-gray300 border">
          <CardTitle className="flex items-center gap-4">
            <CurrentStepIcon />
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 md:p-6">{renderStep()}</CardContent>
      </Card>
    </div>
  );
}
