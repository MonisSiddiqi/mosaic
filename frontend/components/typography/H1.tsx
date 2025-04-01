import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H1: FC<Props> = ({ children, className }) => (
  <h1 className={cn(`text-xl font-bold text-gray-900`, className)}>
    {children}
  </h1>
);
