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
import { SiteMeasurement } from "./form-steps/site-measurement";
import { Budget } from "./form-steps/budget";

const steps = [
  { title: "Project Details", icon: Building2Icon },
  { title: "Location", icon: MapPinIcon },
  { title: "Site Measurement", icon: RulerIcon },
  { title: "Budget", icon: DollarSignIcon },
];

export function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

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

  const updateFormData = (stepData: object) => {
    setFormData({ ...formData, ...stepData });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProjectDetails updateFormData={updateFormData} />;
      case 1:
        return <Location />;
      case 2:
        return <SiteMeasurement />;
      case 3:
        return <Budget />;
      default:
        return null;
    }
  };

  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-8 flex justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex flex-col items-center">
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
              className={`mt-2 text-sm ${
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
        <CardHeader>
          <CardTitle className="flex items-center gap-4">
            <CurrentStepIcon />
            {steps[currentStep].title}
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>{renderStep()}</CardContent>
          <CardFooter className="flex justify-between">
            <Button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
            >
              Previous
            </Button>
            {currentStep === steps.length - 1 ? (
              <Button type="submit">Submit</Button>
            ) : (
              <Button disabled type="button" onClick={handleNext}>
                Next
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
