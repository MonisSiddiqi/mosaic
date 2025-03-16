"use client";

import { Unit } from "@/apis/projects/projects.type";
import {
  Building2Icon,
  DollarSignIcon,
  MapPinIcon,
  RulerIcon,
} from "lucide-react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type FormData = {
  title?: string;
  description?: string;
  serviceId?: string;
  budgetPreference?: number;
  preferenceMessage?: string;
  tags?: string[];

  line1?: string;
  line2?: string;
  country?: string;
  state?: string;
  city?: string;
  postalCode?: string;

  length?: string;
  width?: string;
  height?: string;
  area?: string;
  siteDescription?: string;

  files?: File[];
  sampleFiles?: File[];

  unit?: Unit;
};

interface AddProjectContext {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
  currentStep: number;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  handleNext: () => void;
  handlePrev: () => void;
}

export const AddProjectContext = createContext<AddProjectContext | null>(null);

export const steps = [
  { title: "Project Details", icon: Building2Icon },
  { title: "Location", icon: MapPinIcon },
  { title: "Site Measurement", icon: RulerIcon },
  { title: "Budget", icon: DollarSignIcon },
];

export const AddProjectContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [formData, setFormData] = useState<FormData>({});
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <AddProjectContext.Provider
      value={{
        formData,
        setFormData,
        currentStep,
        setCurrentStep,
        handleNext,
        handlePrev,
      }}
    >
      {children}
    </AddProjectContext.Provider>
  );
};
