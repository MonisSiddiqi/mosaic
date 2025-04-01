import { cn } from "@/lib/utils";
import { FC } from "react";

type Props = {
  text?: string;
  className?: string;
};

export const EmptyUI: FC<Props> = ({ text, className }) => {
  return (
    <div
      className={cn(
        `flex items-center justify-center text-gray-700`,
        className,
      )}
    >
      {text ? text : "No results found."}
    </div>
  );
};
