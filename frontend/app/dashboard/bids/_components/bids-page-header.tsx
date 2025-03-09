"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

export function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-1 text-muted-foreground">{description}</p>
        )}
      </div>
      {action && (
        <Button className="w-full md:w-auto" onClick={action.onClick}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
