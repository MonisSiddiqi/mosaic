import React, { FC } from "react";
import PageHeader from "./page-header";
import { cn } from "@/lib/utils";

type Props = {
  name: string;
  children: React.ReactNode;
  className?: string;
};

export const PageContainer: FC<Props> = ({ children, name, className }) => {
  return (
    <div
      className={cn("min-h-screen w-full bg-background-secondary", className)}
    >
      <PageHeader title={name} />
      <div className="container mx-auto p-6">{children}</div>
    </div>
  );
};
