import { cn } from "@/lib/utils";
import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export const H3: FC<Props> = ({ children, className }) => (
  <h1 className={cn(`font-bold text-gray-900`, className)}>{children}</h1>
);
