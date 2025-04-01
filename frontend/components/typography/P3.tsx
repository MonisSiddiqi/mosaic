import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const P3: FC<Props> = ({ children, className }) => (
  <h1 className={cn(`text-gray-500`, className)}>{children}</h1>
);
