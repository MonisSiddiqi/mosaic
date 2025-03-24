import React, { FC } from "react";
import PageHeader from "./page-header";

type Props = {
  name: string;
  children: React.ReactNode;
};

export const PageContainer: FC<Props> = ({ children, name }) => {
  return (
    <div className="w-full bg-background-secondary">
      <PageHeader title={name} />
      <div className="container mx-auto px-4 py-12 md:py-16">{children}</div>
    </div>
  );
};
