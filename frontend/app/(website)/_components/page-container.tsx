import React, { FC } from "react";
import PageHeader from "./page-header";

type Props = {
  name: string;
  children: React.ReactNode;
};

export const PageContainer: FC<Props> = ({ children, name }) => {
  return (
    <div className="min-h-screen w-full bg-background-secondary">
      <PageHeader title={name} />
      <div className="container mx-auto p-6">{children}</div>
    </div>
  );
};
