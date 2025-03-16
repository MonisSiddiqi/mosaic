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
import { useAddProject } from "@/hooks/use-add-project";
import { steps } from "@/context/add-project-context";
import { Progress } from "@/components/ui/progress";

export function MultiStepForm() {
  const { currentStep } = useAddProject();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ProjectDetails />;
      case 1:
        return <Location />;
      case 2:
        return <SiteMeasurements />;
      case 3:
        return <BudgetStep />;
      default:
        return null;
    }
  };

  const CurrentStepIcon = steps[currentStep].icon;

  const getProgress = () => {
    let step = 0;
    if (currentStep === step) {
      return 5;
    } else if (currentStep === step + 1) {
      return 35;
    } else if (currentStep === step + 2) {
      return 70;
    } else {
      return 98;
    }
  };

  return (
    <div className="mx-auto max-w-4xl md:p-4">
      <div className="mb-7 flex flex-col items-start gap-6 md:flex-row md:justify-between">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center gap-4 md:flex-col">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                currentStep >= index
                  ? "bg-brand-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <step.icon className="h-5 w-5" />
            </div>
            <span
              className={`text-sm md:mt-2 ${
                currentStep >= index
                  ? "font-semibold text-brand-primary"
                  : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      <Progress value={getProgress()} className="mb-7" />

      <Card>
        <CardHeader className="border-b border-gray-100">
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
